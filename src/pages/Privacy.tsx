import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { useTheme } from '@/hooks/useTheme';
import { Shield } from 'lucide-react';

const Privacy = () => {
  useScrollTop();
  const { isDark } = useTheme();
  const sections = [
    { title: '1. Information We Collect', content: 'We collect information you provide directly — your name, email address, wellness profile data, health goals, and payment information. We also automatically collect usage data including device type, IP address, browser type, pages visited, and interaction patterns through cookies and similar technologies. Health-related data such as yoga session history, meditation records, and wellness assessments is collected only with your explicit consent.' },
    { title: '2. How We Use Your Information', content: 'We use your information to provide and personalize our wellness services, process transactions, send service communications, generate wellness insights and recommendations through our AI systems, match you with suitable instructors, and improve our platform. We may also use anonymized, aggregated data for research and product development. We never use your personal health data for advertising to third parties.' },
    { title: '3. Data Sharing and Disclosure', content: 'We do not sell your personal data. We share data with trusted service providers who assist in platform operations (payment processors, email services, cloud infrastructure) under strict confidentiality agreements. We may share data with instructors you book with (name, session history) and retreat organizers you book through. We disclose data when required by law or to protect the rights, safety, or property of YogicTown, our users, or the public.' },
    { title: '4. Data Security', content: 'We implement industry-standard security measures including AES-256 encryption for data at rest, TLS 1.3 for data in transit, regular security audits, access controls with least-privilege principles, and SOC 2 Type II compliance. Health and wellness data undergoes additional encryption and access restrictions. Despite these measures, no internet transmission is 100% secure.' },
    { title: '5. Your Rights (GDPR & CCPA)', content: 'Depending on your location, you have rights to access, correct, delete, or port your data; object to processing; withdraw consent; and opt out of data sales (we do not sell data). To exercise these rights, contact us at privacy@yogictown.com. We respond within 30 days. EU residents may lodge complaints with their local data protection authority.' },
    { title: '6. Cookies and Tracking', content: 'We use essential cookies for platform functionality, performance cookies to analyze usage patterns, and preference cookies to remember your settings. We do not use third-party advertising cookies. You can manage cookie preferences through your browser settings or our cookie consent banner. Disabling essential cookies may affect platform functionality.' },
    { title: '7. Children\'s Privacy', content: 'YogicTown is not directed to individuals under 16 years of age. We do not knowingly collect personal information from children under 16. If we become aware that a child under 16 has provided us with personal information, we will take steps to delete such information promptly.' },
    { title: '8. Changes to This Policy', content: 'We may update this Privacy Policy periodically. We will notify you of material changes by email or through a prominent notice on our platform at least 30 days before the change takes effect. Your continued use of YogicTown after changes constitutes acceptance of the updated policy.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding" style={{ background: isDark ? 'linear-gradient(135deg, hsl(150 15% 12%) 0%, hsl(150 15% 8%) 100%)' : 'linear-gradient(135deg, hsl(133 20% 96%) 0%, hsl(60 17% 98%) 100%)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="tag-pill mx-auto mb-5 w-fit"><Shield size={12} /> Privacy Policy</div>
            <h1 className="text-5xl font-bold mb-5">Your Privacy,<br /><span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>Our Priority</span></h1>
            <p className="text-xl text-muted-foreground">We are transparent about how we collect, use, and protect your personal information.</p>
            <p className="text-sm text-muted-foreground mt-3">Last updated: May 28, 2026</p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
          <div className="card-wellness mb-6 flex items-start gap-4" style={{ background: isDark ? 'hsl(150 12% 14%)' : 'hsl(133 20% 96%)', borderColor: isDark ? 'hsl(150 12% 20%)' : 'hsl(133 20% 88%)' }}>
            <Shield size={20} className="shrink-0 mt-0.5" style={{ color: isDark ? 'hsl(133 25% 75%)' : 'hsl(133 18% 59%)' }} />
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Summary:</strong> We collect your wellness data only to improve your experience on YogicTown. We never sell personal data. You can delete your account and data at any time. For questions, contact <a href="mailto:privacy@yogictown.com" className="underline" style={{ color: 'hsl(133 18% 59%)' }}>privacy@yogictown.com</a>.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold mb-3">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-sm">{s.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-2xl border border-border">
            <h3 className="font-semibold mb-2">Contact Our Privacy Team</h3>
            <p className="text-sm text-muted-foreground">For privacy-related requests or questions about this policy:</p>
            <p className="text-sm mt-2">Email: <a href="mailto:privacy@yogictown.com" className="underline" style={{ color: 'hsl(133 18% 59%)' }}>privacy@yogictown.com</a></p>
            <p className="text-sm">Address: YogicTown Pvt. Ltd., Rishikesh, Uttarakhand 249201, India</p>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Privacy;
