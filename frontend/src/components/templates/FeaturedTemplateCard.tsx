import React from 'react';
import { Template } from '../../types';
import { Link } from '../layout/Navbar';
import { ArrowRight, Star } from 'lucide-react';

interface FeaturedTemplateCardProps {
  template: Template;
}

export const FeaturedTemplateCard: React.FC<FeaturedTemplateCardProps> = ({ template }) => {
  return (
    <Link
      to={`/templates?id=${template.id}`}
      className="group relative flex-shrink-0 w-80 bg-white rounded-[20px] border-2 border-[#33CFFF] shadow-[0_10px_25px_rgba(0,180,255,0.12),0_0_0_1px_rgba(51,207,255,0.25),0_0_18px_rgba(51,207,255,0.18)] hover:shadow-[0_16px_40px_rgba(0,180,255,0.2),0_0_0_2px_rgba(51,207,255,0.4),0_0_28px_rgba(51,207,255,0.25)] hover:-translate-y-[6px] transition-all duration-250 ease-out overflow-hidden flex flex-col p-6"
    >
      {/* Thumbnail Container */}
      <div className="relative w-full rounded-[14px] bg-gray-100 overflow-hidden flex items-center justify-center aspect-[4/5]">
        <img
          src={template.thumbnailUrl}
          alt={`${template.name} template preview`}
          className="w-full h-full object-contain object-center bg-white transform transition-transform duration-300 group-hover:scale-[1.02]"
          onError={(event) => {
            if (event.currentTarget.src.endsWith('/thumbnails/placeholder.svg')) return;
            event.currentTarget.src = '/thumbnails/placeholder.svg';
          }}
        />

        {/* Style Overlay */}
        <div className={`absolute inset-0 ${template.thumbnailClass} opacity-20 pointer-events-none`} />

        {/* Star Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-yellow-500 p-1.5 rounded-full shadow-sm">
          <Star size={14} fill="currentColor" />
        </div>
      </div>

      {/* Spacer */}
      <div className="h-6" />

      {/* Text Section */}
      <div className="flex flex-col">
        <h3 className="font-bold text-[34px] text-[#374151] leading-none group-hover:text-primary transition-colors">
          {template.name}
        </h3>
        <p className="text-[18px] font-medium text-[#6B7280] mt-2">
          Resume Template
        </p>

        <div className="flex items-center text-primary font-semibold text-sm mt-4">
          Edit Template <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
