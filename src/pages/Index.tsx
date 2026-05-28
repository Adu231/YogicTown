import { HeroSection } from '@/components/features/HeroSection';
import { FeaturesSection } from '@/components/features/FeaturesSection';
import { WorkflowSection } from '@/components/features/WorkflowSection';
import { BenefitsSection } from '@/components/features/BenefitsSection';
import { DashboardPreviewSection } from '@/components/features/DashboardPreviewSection';
import { TestimonialsSection } from '@/components/features/TestimonialsSection';
import { PricingSection } from '@/components/features/PricingSection';
import { FAQSection } from '@/components/features/FAQSection';
import { CTABannerSection } from '@/components/features/CTABannerSection';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';

const Index = () => {
  useScrollTop();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <BenefitsSection />
        <DashboardPreviewSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTABannerSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
