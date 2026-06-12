import React from 'react';
import { Template } from '../../types';
import { Button } from '../../components/ui/Button';
import { Check, Sparkles, Lock } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  onSelect: (templateId: string) => void;
  isSelected?: boolean;
  isAuthenticated: boolean;
  userPlan?: 'Free' | 'Pro' | 'Premium';
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onSelect,
  isSelected,
  isAuthenticated,
  userPlan = 'Free',
}) => {

  // ACCESS CONTROL LOGIC:
  // Template is UNLOCKED if:
  // 1. It's a free template (always accessible)
  // 2. It's a pro template AND user is authenticated AND on Pro or Premium plan
  // 3. It's a paid template AND user is authenticated AND on Premium plan
  
   const normalizedPlan = (userPlan || 'Free').toLowerCase();
   const isLocked = 
     template.access === 'free' ? false :
     template.access === 'pro' ? !(isAuthenticated && (normalizedPlan === 'pro' || normalizedPlan === 'premium')) :
     template.access === 'paid' ? !(isAuthenticated && normalizedPlan === 'premium') :
     true;


  const handleSelect = () => {
    onSelect(template.id);
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border overflow-hidden flex flex-col 
      ${isSelected ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-gray-200'}`}
    >

      {/* Preview Image */}
      <div
        className="relative w-full bg-gray-100 overflow-hidden cursor-pointer rounded-t-2xl"
        onClick={handleSelect}
      >
        <div className="aspect-[4/5]">
          <img
            src={template.thumbnailUrl}
            alt={template.name}
            className="w-full h-full object-contain transition-opacity duration-300 rounded-t-2xl shadow-sm bg-white p-2"
            loading="lazy"
            onError={(event) => {
              if (event.currentTarget.src.endsWith('/thumbnails/placeholder.svg')) return;
              event.currentTarget.src = '/thumbnails/placeholder.svg';
            }}
          />
        </div>

        {/* TAG */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
          {template.tag}
        </div>

        {/* ACCESS BADGE (top-right corner) */}
        {isLocked && (
          <div className="absolute top-4 right-4">
            <div className={`px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md ${
              template.access === 'paid' 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
                : 'bg-gradient-to-r from-blue-600 to-cyan-600'
            }`}>
              {template.access === 'paid' ? 'Premium' : 'Pro'}
            </div>
          </div>
        )}

        {/* Hover Indicator - Show for all templates */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ${
          isLocked ? 'bg-primary/10' : 'bg-primary/10'
        }`}>
          <div className={`backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold text-sm ${
            isLocked 
              ? 'bg-white/90 text-primary' 
              : 'bg-white/90 text-primary'
          }`}>
            {isLocked ? (
              <>
                <Lock size={16} />
                {template.access === 'paid' ? 'Premium' : 'Pro'} Access
              </>
            ) : (
              <>
                <Sparkles size={16} /> Choose Design
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-text-main text-lg">{template.name}</h3>
          {isSelected && <Check size={20} className="text-primary" />}
        </div>

        <p className="text-xs text-text-muted mb-6 line-clamp-2">
          {template.description}
        </p>

        <Button
          variant={isSelected ? "primary" : "outline"}
          fullWidth
          onClick={handleSelect}
          className={`mt-auto ${isLocked ? 'cursor-pointer' : ''}`}
        >
          {isLocked
            ? template.access === 'paid'
              ? '🔒 Upgrade to Premium'
              : template.access === 'pro'
              ? '🔒 Upgrade to Pro'
              : '🔑 Login Required'
            : isSelected
              ? '✅ Selected'
              : '✨ Select Template'}
        </Button>
      </div>
    </div>
  );
};
