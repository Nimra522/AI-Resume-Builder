
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
      className="group relative flex-shrink-0 w-80 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Thumbnail Area */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
         {/* Actual Preview Image */}
         <img 
           src={template.thumbnailUrl} 
           alt={`${template.name} template preview`}
           className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
           onError={(event) => {
             if (event.currentTarget.src.endsWith('/thumbnails/placeholder.svg')) return;
             event.currentTarget.src = '/thumbnails/placeholder.svg';
           }}
         />
         
         {/* Overlay with template style */}
         <div className={`absolute inset-0 ${template.thumbnailClass} opacity-20 pointer-events-none`}></div>
         
         {/* Badge */}
         <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-yellow-500 p-1.5 rounded-full shadow-sm">
           <Star size={14} fill="currentColor" />
         </div>

         {/* Hover Overlay */}
         <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
      </div>

      {/* Info Content */}
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg text-text-main group-hover:text-primary transition-colors">{template.name}</h3>
        </div>
        <p className="text-sm text-text-muted mb-4 line-clamp-2">{template.description}</p>
        
        <div className="flex items-center text-primary font-semibold text-sm">
           Edit Template <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
