import { UserPlus, ClipboardList, BookOpen, TrendingUp, Users } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create Your Wellness Profile',
    description: 'Sign up and complete a personalized wellness assessment. Tell us your yoga level, health goals, lifestyle preferences, and what you seek.',
    tag: 'Onboarding',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Get Your Personalized Plan',
    description: 'Our AI analyzes your profile and curates a tailored yoga journey — recommended classes, meditation programs, and nutrition guidance just for you.',
    tag: 'AI Planning',
  },
  {
    number: '03',
    icon: BookOpen,
    title: 'Practice & Attend Sessions',
    description: 'Follow your daily plan, attend live classes, book instructor sessions, and explore thousands of on-demand yoga and meditation videos.',
    tag: 'Active Practice',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Track Your Transformation',
    description: 'Monitor your progress with wellness analytics, habit streaks, and detailed health improvement reports. Watch yourself grow day by day.',
    tag: 'Analytics',
  },
  {
    number: '05',
    icon: Users,
    title: 'Connect & Grow Together',
    description: 'Join spiritual circles, wellness challenges, and community groups. Share successes, find accountability partners, and inspire others.',
    tag: 'Community',
  },
];

export function WorkflowSection() {
  return (
    <section className="section-padding" style={{ background: 'hsl(133 20% 96%)' }}>
      <div className="dark:hidden absolute inset-0" style={{ background: 'hsl(133 20% 96%)' }} />
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag-pill mx-auto mb-4">
            <TrendingUp size={12} /> How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Wellness Journey,<br />
            <span className="italic" style={{ color: 'hsl(133 20% 40%)' }}>Step by Step</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            From your very first session to a deeply transformed lifestyle — here is the path we walk together.
          </p>
        </div>

        {/* Desktop: Horizontal flow */}
        <div className="hidden lg:flex items-start gap-4 mb-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex-1 flex flex-col items-center text-center relative">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute top-8 left-1/2 w-full h-0.5 z-0"
                    style={{ background: 'linear-gradient(to right, hsl(133 18% 59%), hsl(133 18% 80%))', marginLeft: '2rem' }} />
                )}
                {/* Step circle */}
                <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, hsl(133 18% 59%), hsl(133 22% 70%))' }}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className="tag-orange mb-2">{step.tag}</div>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mobile: Vertical flow */}
        <div className="lg:hidden space-y-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex gap-4 card-wellness">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, hsl(133 18% 59%), hsl(133 22% 70%))' }}>
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold" style={{ color: 'hsl(133 18% 59%)' }}>{step.number}</span>
                    <div className="tag-orange">{step.tag}</div>
                  </div>
                  <h3 className="text-base font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
