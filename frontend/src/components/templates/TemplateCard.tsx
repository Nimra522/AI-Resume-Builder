import React from 'react';
import { Template } from '../../types';
import { Button } from '../../components/ui/Button';
import { Sparkles, Lock } from 'lucide-react';

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
      className={`group relative bg-gray-100 rounded-[20px] border-2 transition-all duration-250 ease-out overflow-hidden flex flex-col p-4 h-full
        ${isSelected
          ? 'border-[#33CFFF] ring-2 ring-[#33CFFF] ring-offset-2'
          : 'border-[#33CFFF] shadow-[0_10px_25px_rgba(0,180,255,0.12),0_0_0_1px_rgba(51,207,255,0.25),0_0_18px_rgba(51,207,255,0.18)] hover:shadow-[0_16px_40px_rgba(0,180,255,0.2),0_0_0_2px_rgba(51,207,255,0.4),0_0_28px_rgba(51,207,255,0.25)] hover:-translate-y-[6px]'
        }`}
    >
      {/* Thumbnail Container */}
      <div className="relative w-full rounded-[14px] bg-gray-100 overflow-hidden flex items-center justify-center aspect-[3/4] cursor-pointer" onClick={handleSelect}>
        <img
          src={template.thumbnailUrl}
          alt={template.name}
          className="w-full h-full object-contain object-center bg-white"
          onError={(event) => {
            if (event.currentTarget.src.endsWith('/thumbnails/placeholder.svg')) return;
            event.currentTarget.src = '/thumbnails/placeholder.svg';
          }}
        />

        {/* HOVER overlay */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center ${
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

      {/* Spacer */}
      <div className="h-4" />

      {/* Text Section */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-lg text-[#374151] leading-tight truncate flex-1">
            {template.name}
          </h3>
          {/* Plan Badge (only for Pro/Premium) */}
          {(template.access === 'pro' || template.access === 'paid') && (
            <div className={`px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md flex-shrink-0 ${
              template.access === 'paid'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600'
            }`}>
              {template.access === 'paid' ? 'Premium' : 'Pro'}
            </div>
          )}
        </div>
        <p className="text-xs font-medium text-[#6B7280] mt-1 truncate">
          Resume Template
        </p>

        <div className="mt-3 mt-auto">
          <Button
            variant={isSelected ? "primary" : "outline"}
            fullWidth
            onClick={handleSelect}
            className={`${isLocked ? 'cursor-pointer' : ''}`}
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
    </div>
  );
};
