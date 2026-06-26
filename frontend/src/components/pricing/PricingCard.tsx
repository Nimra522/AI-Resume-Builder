
import React from 'react';
import { PricingPlan } from '../../data/pricing';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (planId: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  const price = plan.priceMonthly;
  const period ='/mo';
  
  return (
    <div 
      className={`
        relative flex flex-col rounded-2xl transition-all duration-500 transform overflow-hidden
        ${plan.isPopular 
          ? 'bg-gradient-to-b from-white via-white to-indigo-50 border-2 border-primary shadow-xl scale-105 z-10' 
          : 'bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1'
        }
      `}
    >
      {/* Gradient Background Decoration for Popular Plan */}
      {plan.isPopular && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50 pointer-events-none"></div>
      )}

      {/* Plan Header */}
      <div className={`
        p-5 relative z-10
        ${plan.isPopular ? 'bg-gradient-to-r from-primary to-purple-600 text-white' : 'bg-gray-50 border-b border-gray-100'}
      `}>
        {plan.isPopular && (
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles size={14} className="text-yellow-300" />
            <span className="text-xs font-bold tracking-wide uppercase text-indigo-100">Most Popular</span>
          </div>
        )}
        <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
        <p className="text-xs opacity-90 min-h-[32px]">{plan.description}</p>
      </div>

      {/* Price Section */}
      <div className="p-5 relative z-10">
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-3xl font-extrabold text-gray-900">${price}</span>
          <span className="text-gray-500 font-medium text-sm">{period}</span>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex-grow px-5 pb-5 relative z-10 space-y-3">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            <div className={`
              p-1 rounded-full flex-shrink-0 mt-0.5
              ${plan.isPopular 
                ? 'bg-gradient-to-br from-primary to-purple-600 text-white' 
                : 'bg-indigo-100 text-primary'
              }
            `}>
              <Check size={12} strokeWidth={3} />
            </div>
            <span className="text-xs text-gray-700 leading-relaxed font-medium">{feature}</span>
          </div>
        ))}
      </div>

      {/* Button Section */}
      <div className="p-5 pt-0 relative z-10">
        <Button 
          variant={plan.isPopular ? 'primary' : plan.buttonVariant} 
          fullWidth 
          onClick={() => onSelect(plan.id)}
          className={`
            py-2.5 text-sm
            ${plan.isPopular 
              ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark hover:to-purple-700 shadow-lg hover:shadow-xl' 
              : plan.buttonVariant === 'outline' 
                ? 'border-gray-200 hover:border-primary hover:bg-primary/5' 
                : ''
            }
          `}
        >
          {plan.buttonText}
        </Button>
      </div>
    </div>
  );
};
