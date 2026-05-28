import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CreditCard, ShieldCheck, Sparkles, Leaf, Award, CheckCircle, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { useAuth } from '@/hooks/useAuth';
import { PRICING_PLANS } from '@/constants';
import { updateProfile } from '@/lib/auth';
import { toast } from 'sonner';

const PaymentPage = () => {
  useScrollTop();
  const { user, refreshUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Get selected plan or fallback to Yogi
  const planId = location.state?.planId || 'premium';
  const isYearly = location.state?.isYearly || false;
  const selectedPlan = PRICING_PLANS.find(p => p.id === planId) || PRICING_PLANS[2];

  // Forms state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [processStep, setProcessStep] = useState(0);

  const steps = [
    'Establishing secure gateway connection...',
    'Verifying subscription selection...',
    'Authorizing mock payment...',
    'Aligning your mind and body...',
    'Namaste, finalizing your enrollment...',
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full text-center card-wellness p-8">
          <Leaf className="w-12 h-12 mx-auto mb-4" style={{ color: 'hsl(133 18% 59%)' }} />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-6">Please log in or register to complete your membership setup.</p>
          <div className="flex gap-4">
            <Link to="/login" className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-all">Sign In</Link>
            <Link to="/register" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all" style={{ background: 'hsl(133 18% 59%)' }}>Register</Link>
          </div>
        </div>
      </div>
    );
  }

  const price = isYearly ? selectedPlan.price.yearly : selectedPlan.price.monthly;
  const billingCycle = isYearly ? '/yr' : '/mo';
  const tax = price * 0.18; // 18% GST / tax
  const total = price + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      // Format: 4 digits separated by spaces
      const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = cleaned.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || '';
      const parts = [];

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }

      if (parts.length > 0) {
        setFormData(p => ({ ...p, cardNumber: parts.join(' ') }));
      } else {
        setFormData(p => ({ ...p, cardNumber: cleaned.substring(0, 16) }));
      }
    } else if (name === 'expiry') {
      // Format: MM/YY
      const cleaned = value.replace(/[^0-9]/g, '');
      if (cleaned.length >= 2) {
        setFormData(p => ({ ...p, expiry: `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}` }));
      } else {
        setFormData(p => ({ ...p, expiry: cleaned }));
      }
    } else if (name === 'cvc') {
      const cleaned = value.replace(/[^0-9]/g, '').slice(0, 3);
      setFormData(p => ({ ...p, cvc: cleaned }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlan.id !== 'free' && (!formData.cardNumber || !formData.expiry || !formData.cvc)) {
      toast.error('Please enter payment credentials');
      return;
    }

    setIsProcessing(true);
    setProcessStep(0);

    // Simulate step loader
    const interval = setInterval(() => {
      setProcessStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 900);

    // Finalize payment mock
    setTimeout(async () => {
      try {
        await updateProfile({ subscription: selectedPlan.id });
        refreshUser();
        clearInterval(interval);
        setIsProcessing(false);
        setIsSuccess(true);
        toast.success(`Success! You are now subscribed to ${selectedPlan.name} Plan!`);
      } catch (err) {
        clearInterval(interval);
        setIsProcessing(false);
        toast.error('Payment verification failed. Please try again.');
      }
    }, 4800);
  };

  const planColors: Record<string, string> = {
    free: 'linear-gradient(135deg, #a8c3b0, #84a98c)',
    basic: 'linear-gradient(135deg, #5b8fb9, #3f72af)',
    premium: 'linear-gradient(135deg, #b392ac, #957dad)',
    elite: 'linear-gradient(135deg, #f4a261, #e76f51)',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
          <Link to="/pricing" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Pricing
          </Link>

          {isProcessing ? (
            <div className="max-w-md mx-auto text-center py-20 card-wellness min-h-[400px] flex flex-col justify-center items-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full border-4 border-muted border-t-primary animate-spin" style={{ borderTopColor: 'hsl(133 18% 59%)' }} />
                <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 animate-pulse" style={{ color: 'hsl(133 18% 59%)' }} />
              </div>
              <h3 className="text-xl font-bold mb-2">Processing Secure Payment</h3>
              <p className="text-sm text-muted-foreground min-h-[40px] px-6 transition-all duration-300">
                {steps[processStep]}
              </p>
              <div className="w-48 h-1.5 rounded-full bg-muted mt-6 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(processStep + 1) * 20}%`, background: 'hsl(133 18% 59%)' }} />
              </div>
            </div>
          ) : isSuccess ? (
            <div className="max-w-md mx-auto text-center py-16 card-wellness animate-in fade-in zoom-in duration-300">
              <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500 animate-bounce" />
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Namaste, {user.name.split(' ')[0]}!</h2>
              <p className="text-lg font-medium text-foreground mb-3">Subscription Activated Successfully</p>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-8">
                Your account has been upgraded to the <span className="font-bold text-foreground">{selectedPlan.name}</span> plan. Your wellness journey is fully aligned!
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg"
                style={{ background: 'hsl(133 18% 59%)' }}
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Payment details form */}
              <div className="flex-1 card-wellness p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'hsl(133 20% 92%)' }}>
                    <CreditCard className="w-5 h-5" style={{ color: 'hsl(133 18% 59%)' }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Secure Checkout</h2>
                    <p className="text-xs text-muted-foreground">Payments are securely encrypted with 256-bit SSL technology.</p>
                  </div>
                </div>

                {selectedPlan.id !== 'free' && (
                  <div className="relative w-full max-w-sm mx-auto h-48 rounded-2xl p-6 text-white shadow-xl transition-all duration-500 overflow-hidden"
                    style={{ background: planColors[selectedPlan.id] || planColors.premium }}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 -translate-y-12" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-8 translate-y-8" />
                    
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="text-xs font-semibold tracking-wider text-white/70 uppercase">YogicTown Card</div>
                        <div className="text-lg font-bold tracking-wide mt-1">{selectedPlan.name} Plan</div>
                      </div>
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>

                    <div className="text-xl font-mono tracking-widest mb-4">
                      {formData.cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    <div className="flex justify-between text-xs font-mono">
                      <div>
                        <div className="text-white/60 text-[9px] uppercase tracking-wider">Cardholder</div>
                        <div className="font-semibold truncate max-w-[180px]">{formData.name || 'YOUR NAME'}</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-[9px] uppercase tracking-wider">Expires</div>
                        <div className="font-semibold">{formData.expiry || 'MM/YY'}</div>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Cardholder Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3 py-2.5 rounded-xl bg-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
                      required
                    />
                  </div>

                  {selectedPlan.id !== 'free' ? (
                    <>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="4111 2222 3333 4444"
                          className="w-full px-3 py-2.5 rounded-xl bg-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono transition-all"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Expiration Date</label>
                          <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-3 py-2.5 rounded-xl bg-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">CVC / CVV</label>
                          <input
                            type="password"
                            name="cvc"
                            value={formData.cvc}
                            onChange={handleInputChange}
                            placeholder="•••"
                            maxLength={3}
                            className="w-full px-3 py-2.5 rounded-xl bg-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono transition-all"
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 rounded-xl text-sm" style={{ background: 'hsl(133 20% 92%)', color: 'hsl(133 20% 35%)' }}>
                      ✨ You selected the Seeker (Free) plan. No credit card information is required!
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>Your checkout details are protected. Cancel easily at any time from Settings.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg mt-4 flex items-center justify-center gap-2"
                    style={{ background: 'hsl(133 18% 59%)' }}
                  >
                    {selectedPlan.id === 'free' ? 'Activate Free Membership' : `Pay $${total.toFixed(2)} & Align Now`}
                  </button>
                </form>
              </div>

              {/* Order Summary Side Card */}
              <div className="lg:w-96 card-wellness p-6 h-fit space-y-6">
                <h3 className="font-bold text-lg border-b border-border pb-3">Membership Summary</h3>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'hsl(27 87% 93%)' }}>
                    {selectedPlan.id === 'free' ? (
                      <Leaf className="w-5 h-5 text-accent" style={{ color: 'hsl(27 87% 60%)' }} />
                    ) : selectedPlan.id === 'elite' ? (
                      <Award className="w-5 h-5 text-accent" style={{ color: 'hsl(27 87% 60%)' }} />
                    ) : (
                      <Sparkles className="w-5 h-5 text-accent" style={{ color: 'hsl(27 87% 60%)' }} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{selectedPlan.name} Plan</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{selectedPlan.description}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Membership Type</span>
                    <span className="font-medium">{isYearly ? 'Annual Billing (Save 25%)' : 'Monthly Billing'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan Rate</span>
                    <span className="font-medium">${price.toFixed(2)}{billingCycle}</span>
                  </div>
                  {selectedPlan.id !== 'free' && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxes & Fees (18% GST)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
                    <span>Grand Total</span>
                    <span style={{ color: 'hsl(27 87% 60%)' }}>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 space-y-2">
                  <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">Features Included:</h4>
                  <ul className="space-y-1.5">
                    {selectedPlan.features.slice(0, 5).map((f, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'hsl(133 18% 59%)' }} />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                    {selectedPlan.features.length > 5 && (
                      <li className="text-[10px] text-muted-foreground/80 italic">+ {selectedPlan.features.length - 5} more premium features</li>
                    )}
                  </ul>
                </div>
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

export default PaymentPage;
