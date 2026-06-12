import React, { useState, useEffect } from 'react';
import { PRICING_PLANS, PRICING_FAQS } from '../data/pricing';
import { PricingCard } from '../components/pricing/PricingCard';
import { FAQItem } from '../components/faq/FAQItem';
import { Button } from '../components/ui/Button';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../components/layout/Navbar';

export const PricingPage: React.FC = () => {
  const billingCycle: 'monthly' = 'monthly';
  const { navigate } = useLocation();
  const { user, isAuthenticated, openLoginModal, createCheckoutSession } = useAuth();
  const normalizedPlan = (user?.plan || 'free').toLowerCase();
  const planHierarchy: Record<string, number> = { free: 0, pro: 1, premium: 2 };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlanSelect = async (planId: string) => {
    if (!isAuthenticated) {
      // If user is not logged in, open login/signup modal
      openLoginModal('/pricing');
      return;
    }

    if (planId === 'free') {
      // Free plan doesn't require payment
      navigate('/dashboard');
      return;
    }

    const userPlanLevel = planHierarchy[normalizedPlan] ?? 0;
    const targetPlanLevel = planHierarchy[planId] ?? 0;
    if (userPlanLevel >= targetPlanLevel) {
      alert('You already have access to this plan or higher.');
      return;
    }

    // For paid plans, create a checkout session
    try {
      const result = await createCheckoutSession(planId);
      console.log('Checkout result:', result);
      
      if (result.success && result.sessionUrl) {
        // Use Stripe's provided checkout URL
        console.log('Redirecting to Stripe checkout:', result.sessionUrl);
        window.location.href = result.sessionUrl;
      } else if (result.success && result.sessionId) {
        // Fallback: construct URL if sessionUrl not provided
        const checkoutUrl = `https://checkout.stripe.com/pay/${result.sessionId}`;
        console.log('Redirecting to constructed Stripe checkout:', checkoutUrl);
        window.location.href = checkoutUrl;
      } else {
        alert(`Failed to initiate checkout: ${result.message || 'Unknown error'}`);
        if (result.error) {
          console.error('Checkout error details:', result.error);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`An error occurred during checkout: ${errorMessage}`);
      console.error('Checkout exception:', error);
    }
  };

  return (
    <div className="pb-20 animate-fade-in">
      
      {/* 1. Hero Section */}
      <section className="text-center py-16 md:py-24 px-4 max-w-4xl mx-auto">
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-primary text-sm font-medium mb-6 animate-fade-in-up">
            <ShieldCheck size={16} />
            <span>7-Day Money-Back Guarantee</span>
         </div>
         <h1 className="text-4xl md:text-6xl font-bold text-text-main mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
           Invest in Your <span className="text-primary">Career Success</span>
         </h1>
         <p className="text-xl text-text-muted max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
           Choose the plan that fits your goals. Unlock premium templates, advanced features, and unlimited downloads.
         </p>
      </section>

      {/* 2. Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PRICING_PLANS.map((plan, idx) => (
            <div key={plan.id} className="animate-fade-in-up" style={{ animationDelay: `${0.4 + (idx * 0.1)}s` }}>
              <PricingCard 
                plan={plan}  
                onSelect={handlePlanSelect} 
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
         <div className="text-center mb-12">
           <h2 className="text-3xl font-bold text-text-main mb-4">Frequently Asked Questions</h2>
         </div>
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
           {PRICING_FAQS.map((faq, idx) => (
             <FAQItem key={idx} question={faq.question} answer={faq.answer} />
           ))}
         </div>
      </section>

      {/* 5. CTA Footer */}
      <section className="max-w-5xl mx-auto px-4">
         <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
           
           <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">
             Ready to land your dream job?
           </h2>
           <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto relative z-10">
             Join thousands of professionals who have used ResumeCraft to advance their careers. Start building for free today.
           </p>
           <div className="relative z-10">
             <Button 
               variant="secondary" 
               size="lg" 
               className="bg-white text-gray-900 hover:bg-gray-100 border-none"
               onClick={() => navigate('/templates')}
               icon={<ArrowRight size={20} />}
             >
               Get Started Now
             </Button>
           </div>
         </div>
      </section>

    </div>
  );
};
