
import React from 'react';
import { PricingPlan } from '../../data/pricing';
import { Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (planId: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  const price = plan.priceMonthly;
  const period ='/mo'; // Display price per month even for yearly
  
  return (
    <div 
      className={`
        relative flex flex-col p-8 bg-white rounded-2xl transition-all duration-300 transform
        ${plan.isPopular 
          ? 'border-2 border-primary shadow-xl scale-105 z-10' 
          : 'border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1'
        }
      `}
    >
      {plan.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-text-main">{plan.name}</h3>
        <p className="text-sm text-text-muted mt-2 min-h-[40px]">{plan.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-text-main">${price}</span>
          <span className="text-text-muted">{period}</span>
        </div>
        {/* {plan.priceMonthly > 0 && (
          <p className="text-xs text-green-600 font-medium mt-1">
            Billed ${price * 12} yearly
          </p>
        )} */}
      </div>

      <div className="flex-grow space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="p-0.5 bg-green-100 rounded-full text-green-600 mt-0.5">
              <Check size={14} strokeWidth={3} />
            </div>
            <span className="text-sm text-text-main leading-tight">{feature}</span>
          </div>
        ))}
      </div>

      <Button 
        variant={plan.buttonVariant} 
        fullWidth 
        size="lg"
        onClick={() => onSelect(plan.id)}
      >
        {plan.buttonText}
      </Button>
    </div>
  );
};
