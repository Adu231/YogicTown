import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Mail, Phone, MapPin, Clock, CheckCircle, MessageSquare, Users, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

const CONTACT_TOPICS = ['General Inquiry', 'Technical Support', 'Billing & Payments', 'Instructor Application', 'Retreat Partnership', 'Press & Media', 'Other'];

const Contact = () => {
  useScrollTop();
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email || !form.email.includes('@')) errs.email = 'Valid email required';
    if (!form.topic) errs.topic = 'Please select a topic';
    if (!form.message.trim() || form.message.length < 20) errs.message = 'Message must be at least 20 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      toast.success("Message sent! We'll reply within 24 hours.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding" style={{ background: 'linear-gradient(135deg, hsl(133 20% 96%) 0%, hsl(60 17% 98%) 100%)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="tag-pill mx-auto mb-5 w-fit"><MessageSquare size={12} /> Get in Touch</div>
            <h1 className="text-5xl font-bold mb-5">We Are Here for You</h1>
            <p className="text-xl text-muted-foreground">Have a question, feedback, or partnership inquiry? Our team of wellness enthusiasts is ready to help.</p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-12 px-4 md:px-8 bg-background">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
            {[
              { icon: HelpCircle, title: 'Help Center', desc: 'Browse our FAQ and knowledge base for instant answers.', action: 'Visit FAQ', href: '/faq' },
              { icon: MessageSquare, title: 'Live Chat', desc: 'Chat with our team in real-time during business hours.', action: 'Start Chat', href: '#' },
              { icon: Users, title: 'Community', desc: 'Ask questions and share experiences with our community.', action: 'Join Community', href: '/dashboard' },
            ].map((opt, i) => {
              const Icon = opt.icon;
              return (
                <div key={i} className="card-wellness text-center">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'hsl(133 20% 92%)' }}>
                    <Icon size={20} style={{ color: 'hsl(133 18% 59%)' }} />
                  </div>
                  <h3 className="font-semibold mb-1">{opt.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{opt.desc}</p>
                  <a href={opt.href} className="text-sm font-medium hover:underline" style={{ color: 'hsl(133 18% 59%)' }}>{opt.action} →</a>
                </div>
              );
            })}
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="card-wellness">
                <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
                <p className="text-sm text-muted-foreground mb-6">We respond to all inquiries within 24 business hours.</p>

                {sent ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'hsl(133 20% 92%)' }}>
                      <CheckCircle size={28} style={{ color: 'hsl(133 18% 59%)' }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Received!</h3>
                    <p className="text-sm text-muted-foreground mb-4">Thank you for reaching out. Our team will get back to you within 24 hours at <strong>{form.email}</strong>.</p>
                    <button onClick={() => { setSent(false); setForm({ name: '', email: '', topic: '', message: '' }); }} className="text-sm font-medium hover:underline" style={{ color: 'hsl(133 18% 59%)' }}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name"
                          className={`w-full px-3 py-2.5 rounded-xl bg-muted border focus:outline-none focus:ring-2 focus:ring-primary text-sm ${errors.name ? 'border-destructive' : 'border-transparent'}`} />
                        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com"
                          className={`w-full px-3 py-2.5 rounded-xl bg-muted border focus:outline-none focus:ring-2 focus:ring-primary text-sm ${errors.email ? 'border-destructive' : 'border-transparent'}`} />
                        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Topic</label>
                      <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}
                        className={`w-full px-3 py-2.5 rounded-xl bg-muted border focus:outline-none focus:ring-2 focus:ring-primary text-sm ${errors.topic ? 'border-destructive' : 'border-transparent'}`}>
                        <option value="">Select a topic...</option>
                        {CONTACT_TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.topic && <p className="text-xs text-destructive mt-1">{errors.topic}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Message</label>
                      <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Tell us how we can help..."
                        className={`w-full px-3 py-2.5 rounded-xl bg-muted border focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none ${errors.message ? 'border-destructive' : 'border-transparent'}`} />
                      {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary w-full justify-center">
                      {sending ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="card-wellness">
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'support@yogictown.com' },
                    { icon: Phone, label: 'Phone', value: '+1 (888) YOGIC-99' },
                    { icon: MapPin, label: 'Headquarters', value: 'Rishikesh, Uttarakhand, India' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'hsl(133 20% 92%)' }}>
                          <Icon size={15} style={{ color: 'hsl(133 18% 59%)' }} />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">{item.label}</div>
                          <div className="text-sm font-medium">{item.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="card-wellness">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} style={{ color: 'hsl(133 18% 59%)' }} />
                  <h3 className="font-semibold">Support Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Mon - Fri</span><span>9 AM – 7 PM IST</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Saturday</span><span>10 AM – 5 PM IST</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Sunday</span><span className="text-muted-foreground">Closed</span></div>
                </div>
                <div className="mt-3 px-3 py-2 rounded-lg text-xs font-medium" style={{ background: 'hsl(133 20% 92%)', color: 'hsl(133 20% 35%)' }}>
                  ✓ Typical response time: Under 4 hours on business days
                </div>
              </div>

              <div className="card-wellness" style={{ background: 'hsl(133 18% 59%)', borderColor: 'transparent', color: 'white' }}>
                <h3 className="font-semibold mb-2">Need Faster Help?</h3>
                <p className="text-sm text-white/75 mb-3">Yogi and Master plan members get priority support with dedicated account managers.</p>
                <a href="/pricing" className="text-sm font-semibold underline text-white">Upgrade your plan →</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
