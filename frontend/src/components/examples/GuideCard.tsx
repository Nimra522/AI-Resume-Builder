
import React from 'react';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

interface GuideCardProps {
  title: string;
  description: string;
  readTime: string;
}

export const GuideCard: React.FC<GuideCardProps> = ({ title, description, readTime }) => {
  return (
    <a href="#" className="flex flex-col bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 group h-full">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-gray-50 text-text-muted rounded-lg group-hover:text-primary transition-colors">
          <BookOpen size={20} />
        </div>
        <div className="flex items-center text-xs text-text-muted">
          <Clock size={12} className="mr-1" /> {readTime}
        </div>
      </div>
      
      <h3 className="font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-text-muted mb-4 flex-grow">
        {description}
      </p>
      
      <div className="text-sm font-semibold text-primary flex items-center mt-auto">
        Read Article <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </a>
  );
};
