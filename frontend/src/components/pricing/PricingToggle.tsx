
import React from 'react';

interface PricingToggleProps {
  billingCycle: 'monthly' | 'yearly';
  onChange: (cycle: 'monthly' | 'yearly') => void;
}

export const PricingToggle: React.FC<PricingToggleProps> = ({ billingCycle, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8 mb-12">
      <span className={`text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'text-text-main' : 'text-text-muted'}`}>
        Monthly
      </span>
      
      <button
        onClick={() => onChange(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
        className="relative w-16 h-8 rounded-full bg-indigo-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        aria-label="Toggle billing cycle"
      >
        <div 
          className={`absolute top-1 left-1 bg-primary w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
            billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'
          }`}
        />
      </button>
      
      <span className={`text-sm font-medium transition-colors flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-text-main' : 'text-text-muted'}`}>
        Yearly
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 animate-pulse">
          Save 20%
        </span>
      </span>
    </div>
  );
};
