
import React from 'react';
import { Example } from '../../types';
import { Eye, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface ExampleCardProps {
  example: Example;
  onView: () => void;
}

export const ExampleCard: React.FC<ExampleCardProps> = ({ example, onView }) => {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
      {/* Thumbnail Area */}
      <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden cursor-pointer" onClick={onView}>
        <img 
          src={example.thumbnailUrl} 
          alt={example.title} 
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700 bg-white"
        />
        
        {/* Style Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
          <CheckCircle size={10} /> Expert Written
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
          <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); onView(); }}>
            <Eye size={16} className="mr-2" /> Quick View
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
           <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white mb-2 ${example.colorAccent}`}>
             {example.role}
           </span>
           <h3 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors leading-tight">
             {example.title}
           </h3>
        </div>
        
        <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
          {example.description}
        </p>

        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={onView} className="flex-1">
            View
          </Button>
        </div>
      </div>
    </div>
  );
};
