import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, Check, Leaf, MapPin, Mail, Phone, Star, Award, Edit3 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { updateProfile, getRoleDashboardPath } from '@/lib/auth';
import { toast } from 'sonner';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';

const Profile = () => {
  useScrollTop();
  const { user, refreshUser } = useAuth();
  const { isDark } = useTheme();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    location: user?.location || '',
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Please sign in to view your profile.</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(form);
      refreshUser();
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const BADGES = [
    { label: '28-Day Streak', icon: '🔥', earned: true },
    { label: '50 Sessions', icon: '🧘', earned: true },
    { label: 'Meditation Master', icon: '🌿', earned: true },
    { label: '100 Sessions', icon: '⭐', earned: false },
    { label: 'Retreat Explorer', icon: '🏔️', earned: false },
    { label: 'Community Leader', icon: '👥', earned: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
          {/* Back */}
          <Link to={getRoleDashboardPath(user.role)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Profile Card */}
            <div className="card-wellness text-center">
              {/* Avatar */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4" style={{ borderColor: 'hsl(133 18% 59%)' }} />
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'hsl(133 18% 59%)' }}>
                  <Camera size={14} className="text-white" />
                </button>
              </div>

              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{user.name}</h2>
              <div className="flex items-center justify-center gap-1 mb-3">
                <div className="tag-pill">{user.yogaLevel || 'Beginner'}</div>
                <div className="tag-orange">{user.subscription || 'Free'} Plan</div>
              </div>

              {user.bio && <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{user.bio}</p>}

              <div className="space-y-2 text-sm text-muted-foreground">
                {user.email && <div className="flex items-center justify-center gap-2"><Mail size={14} /> {user.email}</div>}
                {user.phone && <div className="flex items-center justify-center gap-2"><Phone size={14} /> {user.phone}</div>}
                {user.location && <div className="flex items-center justify-center gap-2"><MapPin size={14} /> {user.location}</div>}
              </div>

              <div className="border-t border-border mt-5 pt-5">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { value: '142', label: 'Sessions' },
                    { value: '28', label: 'Streak' },
                    { value: '83', label: 'Score' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="text-xl font-bold" style={{ color: isDark ? 'hsl(133 25% 75%)' : 'hsl(133 20% 40%)', fontFamily: 'Playfair Display, serif' }}>{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setEditing(!editing)} className="mt-5 w-full btn-primary justify-center text-sm">
                <Edit3 size={15} /> {editing ? 'Cancel Editing' : 'Edit Profile'}
              </button>
            </div>

            {/* Right: Details */}
            <div className="lg:col-span-2 space-y-5">
              {/* Edit Form */}
              {editing && (
                <div className="card-wellness">
                  <h3 className="font-semibold mb-4">Edit Profile Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Full Name', key: 'name', type: 'text' },
                      { label: 'Phone', key: 'phone', type: 'tel' },
                      { label: 'Location', key: 'location', type: 'text' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="text-sm font-medium mb-1.5 block">{field.label}</label>
                        <input type={field.type} value={form[field.key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium mb-1.5 block">Bio</label>
                      <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3}
                        className="w-full px-3 py-2.5 rounded-xl bg-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
                      <Check size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button onClick={() => setEditing(false)} className="px-4 py-2.5 rounded-xl border border-border text-sm hover:bg-muted transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Wellness Goals */}
              {user.wellnessGoals && user.wellnessGoals.length > 0 && (
                <div className="card-wellness">
                  <div className="flex items-center gap-2 mb-4">
                    <Star size={18} style={{ color: 'hsl(27 87% 67%)' }} />
                    <h3 className="font-semibold">Wellness Goals</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.wellnessGoals.map((g) => (
                      <div key={g} className="tag-orange">{g}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Badges */}
              <div className="card-wellness">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={18} style={{ color: 'hsl(27 87% 67%)' }} />
                  <h3 className="font-semibold">Achievements & Badges</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {BADGES.map((badge, i) => (
                    <div key={i} className={`p-3 rounded-xl text-center border ${badge.earned ? 'border-primary/30' : 'border-border opacity-40'}`}
                      style={badge.earned ? { background: isDark ? 'hsl(150 12% 14%)' : 'hsl(133 20% 96%)' } : {}}>
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="text-xs font-medium">{badge.label}</div>
                      {badge.earned && <div className="text-xs mt-1" style={{ color: isDark ? 'hsl(133 25% 75%)' : 'hsl(133 18% 59%)' }}>Earned</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscription */}
              <div className="card-wellness" style={{ background: 'linear-gradient(135deg, hsl(133 18% 59%), hsl(133 22% 48%))', borderColor: 'transparent', color: 'white' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Leaf size={16} />
                      <span className="font-semibold">Current Plan: {user.subscription === 'premium' ? 'Yogi' : (user.subscription || 'Seeker')}</span>
                    </div>
                    <p className="text-sm text-white/75">Renews on June 15, 2026</p>
                  </div>
                  <Link to="/pricing" className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-white/20" style={{ border: '1px solid rgba(255,255,255,0.4)', color: 'white', textDecoration: 'none' }}>
                    Upgrade
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Profile;
