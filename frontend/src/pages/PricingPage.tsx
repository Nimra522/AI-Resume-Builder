import React, { useState, useEffect } from 'react';
import { PRICING_PLANS, PRICING_FAQS } from '../data/pricing';
import { PricingCard } from '../components/pricing/PricingCard';
import { FAQItem } from '../components/faq/FAQItem';
import { Button } from '../components/ui/Button';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../components/layout/Navbar';
import { TEMPLATES } from '../data/templates';

export const PricingPage: React.FC = () => {
  const billingCycle: 'monthly' = 'monthly';
  const { navigate, search } = useLocation();
  const { user, isAuthenticated, openLoginModal, createCheckoutSession } = useAuth();
  const normalizedPlan = (user?.plan || 'free').toLowerCase();
  const planHierarchy: Record<string, number> = { free: 0, pro: 1, premium: 2 };

  const templateId = new URLSearchParams(search).get('templateId');
const lockedTemplate = templateId
  ? TEMPLATES.find(t => t.id === templateId)
  : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlanSelect = async (planId: string) => {
    if (!isAuthenticated) {
      openLoginModal('/pricing');
      return;
    }

    if (planId === 'free') {
      navigate('/dashboard');
      return;
    }

    const userPlanLevel = planHierarchy[normalizedPlan] ?? 0;
    const targetPlanLevel = planHierarchy[planId] ?? 0;
    if (userPlanLevel >= targetPlanLevel) {
      alert('You already have access to this plan or higher.');
      return;
    }

    try {
      const result = await createCheckoutSession(planId);
      console.log('Checkout result:', result);
      
      if (result.success && result.sessionUrl) {
        console.log('Redirecting to Stripe checkout:', result.sessionUrl);
        window.location.href = result.sessionUrl;
      } else if (result.success && result.sessionId) {
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
    <div className="pb-16 bg-gray-50 animate-fade-in">

      {lockedTemplate && (
      <div className="text-center mb-6 p-4 bg-blue-50 border 
        border-blue-200 rounded-xl max-w-2xl mx-auto mt-4">
        <p className="text-blue-800 font-medium text-base">
          🔒 Upgrade your plan to unlock{' '}
          <strong>{lockedTemplate.name}</strong> template
        </p>
      </div>
      )}
      
      {/* Hero Section */}
      <section className="text-center py-12 md:py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 opacity-30 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-200 opacity-30 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-indigo-100 text-primary text-xs font-semibold mb-6 shadow-md animate-fade-in-up">
            <ShieldCheck size={14} />
            <span>7-Day Money-Back Guarantee</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Invest in Your <span className="text-primary">Career Success</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Choose the plan that fits your goals. Unlock premium templates, advanced features, and unlimited downloads.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
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

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
         <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-100 mb-4">
              <CheckCircle2 size={12} className="text-primary" />
              <span className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Questions</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-sm">Everything you need to know about our plans</p>
         </div>
         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
           {PRICING_FAQS.map((faq, idx) => (
             <FAQItem key={idx} question={faq.question} answer={faq.answer} />
           ))}
         </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400 opacity-20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
           
           <div className="relative z-10">
             <h2 className="text-2xl md:text-3xl font-bold mb-4">
               Ready to land your dream job?
             </h2>
             <p className="text-indigo-100 text-base mb-8 max-w-xl mx-auto">
               Join thousands of professionals who have used ResumeCraft to advance their careers. Start building for free today.
             </p>
             <Button 
               variant="secondary" 
               className="bg-white text-gray-900 hover:bg-gray-100 border-none shadow-xl hover:shadow-2xl transition-all duration-300 text-sm py-2.5"
               onClick={() => navigate('/templates')}
               icon={<ArrowRight size={18} />}
             >
               Get Started Now
             </Button>
           </div>
         </div>
      </section>

    </div>
  );
};
