
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CookieCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category: 'Essential' | 'Analytics' | 'Functional' | 'Marketing';
  isRequired?: boolean;
}

export const CookieCard: React.FC<CookieCardProps> = ({ 
  title, 
  description, 
  icon: Icon,
  category,
  isRequired = false
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-indigo-50 text-primary rounded-lg shrink-0">
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className="font-bold text-text-main text-lg">{title}</h3>
            {isRequired ? (
               <span className="px-2.5 py-0.5 bg-indigo-50 text-primary text-xs font-bold uppercase rounded-full border border-indigo-100 tracking-wide">Required</span>
            ) : (
               <span className="px-2.5 py-0.5 bg-gray-50 text-gray-500 text-xs font-bold uppercase rounded-full border border-gray-200 tracking-wide">Optional</span>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-text-muted leading-relaxed mb-4 flex-grow border-b border-gray-50 pb-4">
        {description}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Category: <span className="text-text-main">{category}</span>
        </span>
        
        {/* Visual toggle simulation */}
        <div className={`w-10 h-5 rounded-full relative transition-colors ${isRequired ? 'bg-primary opacity-50 cursor-not-allowed' : 'bg-gray-200'}`}>
          <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full shadow-sm transition-transform ${isRequired ? 'translate-x-5' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};
