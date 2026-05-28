import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { FileText } from 'lucide-react';

const Terms = () => {
  useScrollTop();
  const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing or using YogicTown ("Platform"), you agree to be bound by these Terms and Conditions. If you do not agree to all terms, you may not use the Platform. These terms apply to all visitors, users, instructors, and businesses who access the Platform.' },
    { title: '2. Eligibility and Accounts', content: 'You must be at least 16 years old to use YogicTown. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You agree to provide accurate, current information and to notify us immediately of any unauthorized account use. One person may not maintain multiple accounts.' },
    { title: '3. Subscription and Payments', content: 'Paid subscriptions are billed in advance on a monthly or annual basis. Subscriptions automatically renew unless cancelled before the renewal date. Annual subscriptions cancelled after 7 days of the renewal date are non-refundable for that billing period. Monthly subscriptions may be cancelled anytime before the next billing cycle. We reserve the right to modify pricing with 30 days notice.' },
    { title: '4. Content and Intellectual Property', content: 'All content on YogicTown — including yoga programs, meditation sessions, instructional videos, and written materials — is protected by copyright and owned by YogicTown or our content partners. You receive a limited, non-transferable license to access content for personal, non-commercial use only. You may not download, reproduce, distribute, or create derivative works without explicit written permission.' },
    { title: '5. User-Generated Content', content: 'By posting content on YogicTown (reviews, forum posts, profile information), you grant us a worldwide, non-exclusive license to use, display, and distribute that content in connection with our services. You represent that you own or have the right to post such content, and that it does not violate any third party rights or applicable laws.' },
    { title: '6. Instructor Terms', content: 'Certified instructors who publish classes on YogicTown agree to maintain valid certifications, provide accurate credentials, and deliver sessions as described. Instructors receive 70% of session revenue after platform fees. YogicTown reserves the right to remove instructor accounts that receive consistent poor ratings, provide misleading information, or violate platform policies.' },
    { title: '7. Health Disclaimer', content: 'YogicTown provides wellness content for general informational purposes only. This content is not intended as medical advice and should not replace consultation with qualified healthcare professionals. Always consult your physician before beginning any new exercise or wellness program, particularly if you have pre-existing medical conditions. YogicTown is not liable for any injuries or health issues arising from platform content.' },
    { title: '8. Limitation of Liability', content: 'To the maximum extent permitted by law, YogicTown shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform. Our total liability for any claim shall not exceed the amount you paid to YogicTown in the 12 months preceding the claim.' },
    { title: '9. Governing Law', content: 'These Terms are governed by the laws of India, without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration in Rishikesh, Uttarakhand, India, under the rules of the Indian Arbitration Association.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding" style={{ background: 'linear-gradient(135deg, hsl(133 20% 96%) 0%, hsl(60 17% 98%) 100%)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="tag-pill mx-auto mb-5 w-fit"><FileText size={12} /> Legal</div>
            <h1 className="text-5xl font-bold mb-5">Terms &<br /><span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>Conditions</span></h1>
            <p className="text-xl text-muted-foreground">Please read these terms carefully before using YogicTown.</p>
            <p className="text-sm text-muted-foreground mt-3">Last updated: May 28, 2026 · Effective immediately</p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
          <div className="space-y-8">
            {sections.map((s, i) => (
              <div key={i} className="pb-6 border-b border-border last:border-0">
                <h2 className="text-xl font-bold mb-3">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-sm">{s.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-2xl border border-border">
            <h3 className="font-semibold mb-2">Questions About These Terms?</h3>
            <p className="text-sm text-muted-foreground mb-2">Contact our legal team at <a href="mailto:legal@yogictown.com" className="underline" style={{ color: 'hsl(133 18% 59%)' }}>legal@yogictown.com</a></p>
            <p className="text-xs text-muted-foreground">YogicTown Pvt. Ltd. · Rishikesh, Uttarakhand, India</p>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Terms;
