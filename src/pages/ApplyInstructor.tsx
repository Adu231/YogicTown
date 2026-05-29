import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { useAuth } from '@/hooks/useAuth';
import { register, updateProfile } from '@/lib/auth';
import { toast } from 'sonner';
import { 
  User, Mail, Lock, CheckCircle, Award, 
  DollarSign, Clock, ArrowRight, ArrowLeft, 
  BookOpen, Heart, Sparkles, Check, Eye, EyeOff
} from 'lucide-react';

const SPECIALTIES = [
  'Hatha Yoga', 'Vinyasa Flow', 'Ashtanga', 'Yin Yoga', 
  'Kundalini', 'Meditation', 'Sound Healing', 'Restorative', 'Breathwork'
];

const ApplyInstructor = () => {
  useScrollTop();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  
  // Dynamic step logic: If logged in, start at professional info step (we map this to step 2 visually or programmatically)
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  // Form states
  const [form, setForm] = useState({
    // Step 1: Account Credentials (only for guest)
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Professional details
    experience: '',
    certifications: '',
    price: '60',
    
    // Step 3: Bio & Philosophy
    bio: '',
    philosophy: '',
    termsAgreed: false
  });
  
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleSpecialty = (spec: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email || !form.email.includes('@')) errs.email = 'Enter a valid email address';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    const years = parseInt(form.experience);
    if (!form.experience.trim() || isNaN(years) || years < 0) {
      errs.experience = 'Enter valid years of experience';
    }
    if (!form.certifications.trim()) {
      errs.certifications = 'Please list your certifications (e.g. RYT-200)';
    }
    if (selectedSpecialties.length === 0) {
      errs.specialties = 'Select at least one specialty style';
    }
    const hourlyRate = parseInt(form.price);
    if (!form.price.trim() || isNaN(hourlyRate) || hourlyRate <= 0) {
      errs.price = 'Enter a valid hourly rate';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!form.bio.trim() || form.bio.length < 30) {
      errs.bio = 'Bio must be at least 30 characters';
    }
    if (!form.philosophy.trim() || form.philosophy.length < 20) {
      errs.philosophy = 'Teaching philosophy must be at least 20 characters';
    }
    if (!form.termsAgreed) {
      errs.termsAgreed = 'You must agree to the Instructor Agreement';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (user && step === 1) {
      // If user is already logged in, we skip step 1 directly
      setStep(3); // Go to step 3 (which is bio & philosophy)
      return;
    }

    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handleBack = () => {
    if (user && step === 2) {
      // If logged in and at step 2, back doesn't go to step 1 (account info) since they don't need it.
      // But we can let them review or just stay. Let's make sure they don't get lost.
      return;
    }
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setLoading(true);
    try {
      if (user) {
        // Upgrade existing user profile to 'instructor'
        await updateProfile({ 
          role: 'instructor',
          bio: form.bio,
          phone: user.phone || '+91 99999 88888', // mock default
          location: user.location || 'Mysore, India',
          wellnessGoals: selectedSpecialties
        });
        refreshUser();
      } else {
        // Create new user with role 'instructor'
        await register(form.name, form.email, form.password, 'instructor');
        // Now update their profile with the professional details too
        await updateProfile({
          bio: form.bio,
          phone: '+91 99999 88888',
          location: 'Mysore, India',
          wellnessGoals: selectedSpecialties
        });
        refreshUser();
      }
      
      toast.success('Your instructor profile has been successfully approved! 🌿');
      setApplied(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Application submission failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />
      <main className="pt-24 pb-16 flex-1 flex items-center justify-center px-4">
        <div className="max-w-3xl w-full">
          {!applied ? (
            <div className="card-wellness border border-border shadow-xl overflow-hidden p-0 rounded-3xl bg-card">
              {/* Header Banner */}
              <div className="p-8 text-center text-white" style={{ background: 'linear-gradient(135deg, hsl(133 18% 59%), hsl(133 22% 48%))' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-white/20">
                  <Sparkles size={24} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Become a Certified Instructor
                </h1>
                <p className="text-white/80 text-sm max-w-md mx-auto">
                  Share your yoga journey, inspire practitioners globally, and build a rewarding teaching practice on YogicTown.
                </p>
                
                {/* Progress Bar */}
                <div className="mt-6 flex items-center justify-center gap-2 max-w-xs mx-auto">
                  {[1, 2, 3].map((s) => {
                    const isActive = s <= step;
                    const isSkippedStep1 = user && s === 1;
                    return (
                      <div key={s} className="flex items-center flex-1 last:flex-none">
                        <div 
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isSkippedStep1 ? 'bg-white/40 text-white/80' : 
                            s === step ? 'bg-white text-primary' : 
                            isActive ? 'bg-white/70 text-primary/80' : 'bg-white/20 text-white/50'
                          }`}
                        >
                          {isSkippedStep1 ? <Check size={12} /> : s}
                        </div>
                        {s < 3 && (
                          <div 
                            className={`h-0.5 flex-1 mx-2 transition-all ${s < step ? 'bg-white/70' : 'bg-white/20'}`} 
                            style={{ minWidth: '40px' }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Logged in Welcome Status */}
              {user && step === 1 && (
                <div className="m-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-xs flex items-center gap-3">
                  <CheckCircle size={18} className="text-primary shrink-0" />
                  <div>
                    <span className="font-bold text-foreground">Logged In Active Session:</span>
                    <p className="text-muted-foreground mt-0.5">
                      Applying as <strong className="text-foreground">{user.name}</strong> ({user.email}). 
                      Upon approval, your existing profile will be upgraded with Instructor access.
                    </p>
                  </div>
                </div>
              )}

              {/* Form Content */}
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* STEP 1: ACCOUNT CREDENTIALS (Only for guest) */}
                  {step === 1 && !user && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b pb-2 mb-4">
                        <User size={18} className="text-primary" /> Step 1: Create Your Account
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                            Full Name
                          </label>
                          <div className="relative">
                            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                              type="text" 
                              value={form.name} 
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              placeholder="e.g. Priyanjali Sen"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border text-sm focus:outline-none focus:ring-2 ${
                                errors.name ? 'border-destructive focus:ring-destructive/30' : 'border-transparent focus:ring-primary/30 focus:border-primary'
                              }`}
                            />
                          </div>
                          {errors.name && <p className="text-xs text-destructive mt-1 font-medium">{errors.name}</p>}
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                              type="email" 
                              value={form.email} 
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              placeholder="email@example.com"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border text-sm focus:outline-none focus:ring-2 ${
                                errors.email ? 'border-destructive focus:ring-destructive/30' : 'border-transparent focus:ring-primary/30 focus:border-primary'
                              }`}
                            />
                          </div>
                          {errors.email && <p className="text-xs text-destructive mt-1 font-medium">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                            Password
                          </label>
                          <div className="relative">
                            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                              type={showPass ? 'text' : 'password'} 
                              value={form.password} 
                              onChange={(e) => setForm({ ...form, password: e.target.value })}
                              placeholder="Minimum 6 characters"
                              className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-muted border text-sm focus:outline-none focus:ring-2 ${
                                errors.password ? 'border-destructive focus:ring-destructive/30' : 'border-transparent focus:ring-primary/30 focus:border-primary'
                              }`}
                            />
                            <button 
                              type="button" 
                              onClick={() => setShowPass(!showPass)} 
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                          </div>
                          {errors.password && <p className="text-xs text-destructive mt-1 font-medium">{errors.password}</p>}
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                              type="password" 
                              value={form.confirmPassword} 
                              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                              placeholder="Repeat password"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border text-sm focus:outline-none focus:ring-2 ${
                                errors.confirmPassword ? 'border-destructive focus:ring-destructive/30' : 'border-transparent focus:ring-primary/30 focus:border-primary'
                              }`}
                            />
                          </div>
                          {errors.confirmPassword && <p className="text-xs text-destructive mt-1 font-medium">{errors.confirmPassword}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: PROFESSIONAL INFORMATION */}
                  {((step === 1 && user) || (step === 2)) && (
                    <div className="space-y-5 animate-in fade-in duration-300">
                      <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b pb-2 mb-4">
                        <Award size={18} className="text-primary" /> Step {user ? '1' : '2'}: Professional Credentials
                      </h2>

                      {/* Specialties Multi-Select */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                          Specialty styles (Select all that apply)
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {SPECIALTIES.map((spec) => {
                            const selected = selectedSpecialties.includes(spec);
                            return (
                              <button
                                type="button"
                                key={spec}
                                onClick={() => toggleSpecialty(spec)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                                  selected ? 'bg-primary border-transparent text-white shadow-md' : 'bg-muted border-border hover:border-primary/40'
                                }`}
                                style={selected ? { background: 'hsl(133 18% 59%)' } : {}}
                              >
                                {spec}
                              </button>
                            );
                          })}
                        </div>
                        {errors.specialties && <p className="text-xs text-destructive mt-1 font-medium">{errors.specialties}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {/* Years of Experience */}
                        <div className="md:col-span-1">
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                            Experience (Years)
                          </label>
                          <div className="relative">
                            <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                              type="number" 
                              min="0"
                              value={form.experience} 
                              onChange={(e) => setForm({ ...form, experience: e.target.value })}
                              placeholder="e.g. 5"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border text-sm focus:outline-none focus:ring-2 ${
                                errors.experience ? 'border-destructive' : 'border-transparent focus:ring-primary/30 focus:border-primary'
                              }`}
                            />
                          </div>
                          {errors.experience && <p className="text-xs text-destructive mt-1 font-medium">{errors.experience}</p>}
                        </div>

                        {/* Certifications list */}
                        <div className="md:col-span-1">
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                            Certifications
                          </label>
                          <div className="relative">
                            <Award size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                              type="text" 
                              value={form.certifications} 
                              onChange={(e) => setForm({ ...form, certifications: e.target.value })}
                              placeholder="e.g. RYT-200, RYT-500"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border text-sm focus:outline-none focus:ring-2 ${
                                errors.certifications ? 'border-destructive' : 'border-transparent focus:ring-primary/30 focus:border-primary'
                              }`}
                            />
                          </div>
                          {errors.certifications && <p className="text-xs text-destructive mt-1 font-medium">{errors.certifications}</p>}
                        </div>

                        {/* Hourly Session Price */}
                        <div className="md:col-span-1">
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                            Hourly rate ($/hr)
                          </label>
                          <div className="relative">
                            <DollarSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                              type="number" 
                              min="10"
                              max="300"
                              value={form.price} 
                              onChange={(e) => setForm({ ...form, price: e.target.value })}
                              placeholder="e.g. 60"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border text-sm focus:outline-none focus:ring-2 ${
                                errors.price ? 'border-destructive' : 'border-transparent focus:ring-primary/30 focus:border-primary'
                              }`}
                            />
                          </div>
                          {errors.price && <p className="text-xs text-destructive mt-1 font-medium">{errors.price}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: BIO & PHILOSOPHY */}
                  {step === 3 && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b pb-2 mb-4">
                        <BookOpen size={18} className="text-primary" /> Step {user ? '2' : '3'}: Teaching Philosophy & Bio
                      </h2>

                      {/* Bio */}
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                          Professional Biography (Min 30 chars)
                        </label>
                        <textarea 
                          rows={4}
                          value={form.bio} 
                          onChange={(e) => setForm({ ...form, bio: e.target.value })}
                          placeholder="Tell students about your yoga training, your classes, and your wellness journey..."
                          className={`w-full p-4 rounded-xl bg-muted border text-sm focus:outline-none focus:ring-2 ${
                            errors.bio ? 'border-destructive' : 'border-transparent focus:ring-primary/30 focus:border-primary'
                          }`}
                        />
                        {errors.bio && <p className="text-xs text-destructive mt-1 font-medium">{errors.bio}</p>}
                      </div>

                      {/* Teaching Philosophy */}
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                          Teaching Philosophy (Min 20 chars)
                        </label>
                        <textarea 
                          rows={3}
                          value={form.philosophy} 
                          onChange={(e) => setForm({ ...form, philosophy: e.target.value })}
                          placeholder="What is your approach to guiding practitioners and sharing the wisdom of yoga?"
                          className={`w-full p-4 rounded-xl bg-muted border text-sm focus:outline-none focus:ring-2 ${
                            errors.philosophy ? 'border-destructive' : 'border-transparent focus:ring-primary/30 focus:border-primary'
                          }`}
                        />
                        {errors.philosophy && <p className="text-xs text-destructive mt-1 font-medium">{errors.philosophy}</p>}
                      </div>

                      {/* Terms Agreement */}
                      <div className="pt-2">
                        <label className="relative flex items-start gap-3 cursor-pointer text-xs select-none">
                          <input 
                            type="checkbox" 
                            checked={form.termsAgreed} 
                            onChange={(e) => setForm({ ...form, termsAgreed: e.target.checked })}
                            className="mt-0.5 w-4.5 h-4.5 rounded text-primary focus:ring-primary border-border bg-muted cursor-pointer" 
                          />
                          <span className="text-muted-foreground leading-relaxed">
                            I certify that my teaching credentials are valid and true. I agree to the YogicTown{' '}
                            <a href="/terms" target="_blank" className="underline font-bold hover:text-foreground">Instructor Agreement</a>,{' '}
                            including code of conduct standards and terms of payout processing.
                          </span>
                        </label>
                        {errors.termsAgreed && <p className="text-xs text-destructive mt-1 font-medium">{errors.termsAgreed}</p>}
                      </div>
                    </div>
                  )}

                  {/* Actions Row */}
                  <div className="flex gap-4 pt-4 border-t border-border mt-8">
                    {/* Back Button */}
                    {step > 1 && (
                      <button 
                        type="button" 
                        onClick={handleBack}
                        className="px-5 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-colors flex items-center gap-2"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                    )}

                    {/* Next / Submit Button */}
                    {step < 3 ? (
                      <button 
                        type="button" 
                        onClick={handleNext}
                        className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                        style={{ background: 'hsl(133 18% 59%)' }}
                      >
                        Continue <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-65 flex items-center justify-center gap-2"
                        style={{ background: 'hsl(27 87% 60%)' }}
                      >
                        {loading ? 'Submitting Application...' : 'Submit Application'}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* SUCCESS STATE APPLICATION APPROVED SCREEN */
            <div className="card-wellness border border-border shadow-xl text-center p-12 rounded-3xl bg-card animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-primary/15 shadow-inner">
                <CheckCircle size={44} className="text-primary animate-bounce" style={{ color: 'hsl(133 18% 59%)' }} />
              </div>
              
              <h1 className="text-4xl font-extrabold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Application Approved! 🧘✨
              </h1>
              
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8 leading-relaxed">
                Welcome to the YogicTown family! Your credentials have been verified and your profile is upgraded to <strong className="text-foreground">Certified Instructor</strong>. 
                You can now customize your offerings, set your schedules, and connect with students.
              </p>

              {/* Highlights dashboard information */}
              <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
                <div className="p-4 rounded-2xl bg-muted border border-border flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-background text-primary" style={{ color: 'hsl(133 18% 59%)' }}>
                    <Heart size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs">Profile Active</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Your profile is visible in the directory.</p>
                  </div>
                </div>
                
                <div className="p-4 rounded-2xl bg-muted border border-border flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-background text-primary" style={{ color: 'hsl(133 18% 59%)' }}>
                    <DollarSign size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs">Custom Pricing</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Set session prices and payout methods.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                <button
                  onClick={() => navigate('/instructor-dashboard')}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 w-full"
                  style={{ background: 'hsl(133 18% 59%)' }}
                >
                  Go to Instructor Dashboard <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ApplyInstructor;
