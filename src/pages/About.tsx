import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { CTABannerSection } from '@/components/features/CTABannerSection';
import { AnimatedCounter } from '@/components/features/AnimatedCounter';
import { Leaf, Heart, Globe, Award, Users, Sparkles } from 'lucide-react';
import meditationImage from '@/assets/meditation-group.jpg';

const TEAM = [
  { name: 'Ananya Mehra', role: 'CEO & Co-founder', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', bio: 'RYT-500 certified, 15 years of practice. Former Google product lead.' },
  { name: 'Vikram Rao', role: 'CTO & Co-founder', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', bio: 'MIT grad, 12 years in health tech. Meditates daily before coding.' },
  { name: 'Priya Joshi', role: 'Head of Wellness', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', bio: 'Ayurveda practitioner & yoga therapist with 10 years clinical experience.' },
  { name: 'Rajan Pillai', role: 'Chief Instructor Officer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', bio: 'Kundalini master & retreat facilitator. Trained under legendary teachers.' },
];

const VALUES = [
  { icon: Heart, title: 'Compassionate Design', desc: 'Every feature is built with genuine care for the practitioner\'s wellbeing — not just engagement metrics.' },
  { icon: Globe, title: 'Inclusive Wellness', desc: 'Yoga is for every body, every background, every belief. We celebrate diversity in our global community.' },
  { icon: Award, title: 'Scientific Integrity', desc: 'Our programs blend ancient wisdom with modern research. Every recommendation is evidence-aligned.' },
  { icon: Sparkles, title: 'Continuous Growth', desc: 'We evolve alongside our community, constantly learning and improving our platform with purpose.' },
];

const About = () => {
  useScrollTop();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding" style={{ background: 'linear-gradient(135deg, hsl(133 20% 96%) 0%, hsl(60 17% 98%) 100%)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="tag-pill mx-auto mb-5 w-fit"><Leaf size={12} /> Our Story</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Built by Practitioners,<br />
              <span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>for Practitioners</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              YogicTown was born from a simple frustration: the world's best yoga wisdom was scattered across studios, apps, and ashrams — inaccessible to most people. We set out to change that.
            </p>
          </div>
        </section>

        {/* Mission & Image */}
        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-5">Our Mission: Democratize Holistic Wellness</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                In 2022, our founders — a former Google product lead and a certified yoga therapist — left their careers to build the wellness platform they always wished existed.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                YogicTown is their answer: a place where a stressed software engineer in Bangalore can get the same quality of guidance as someone at an expensive ashram in Rishikesh. Where a beginner in Barcelona can connect with the world's best Ashtanga teacher. Where a meditation student in Singapore can join a spiritual community that actually cares.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, over 120,000 practitioners in 68 countries call YogicTown their wellness home. But we are just getting started.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img src={meditationImage} alt="Community" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding" style={{ background: 'hsl(133 18% 59%)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: 120000, suffix: '+', label: 'Active Members' },
              { value: 68, suffix: '', label: 'Countries' },
              { value: 500, suffix: '+', label: 'Instructors' },
              { value: 2026, suffix: '', label: 'Founded' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-white/75 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-3">What We Stand For</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Our values guide every product decision, community policy, and instructor partnership.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div key={i} className="card-wellness text-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'hsl(133 20% 92%)' }}>
                      <Icon size={22} style={{ color: 'hsl(133 18% 59%)' }} />
                    </div>
                    <h3 className="font-semibold mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section-padding" style={{ background: 'hsl(133 20% 96%)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-3">Meet the Team</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Practitioners, engineers, and visionaries united by a shared love of wellness.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member, i) => (
                <div key={i} className="card-wellness text-center">
                  <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4" style={{ borderColor: 'hsl(133 20% 92%)' }} />
                  <h3 className="font-semibold mb-0.5">{member.name}</h3>
                  <div className="tag-orange mx-auto w-fit mb-3 text-xs">{member.role}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Press */}
        <section className="section-padding bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Featured In</h2>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {['Forbes', 'TechCrunch', 'Vogue Wellness', 'Times of India', 'BBC Health'].map((pub) => (
                <div key={pub} className="text-muted-foreground font-semibold text-lg opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  {pub}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hiring CTA */}
        <section className="section-padding" style={{ background: 'hsl(133 20% 96%)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'hsl(133 18% 59%)' }}>
              <Users size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Join Our Team</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">We are a remote-first team of wellness practitioners and tech builders. If you are passionate about health, spirituality, and technology, we would love to hear from you.</p>
            <a href="/contact" className="btn-accent inline-flex">View Open Positions</a>
          </div>
        </section>

        <CTABannerSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
