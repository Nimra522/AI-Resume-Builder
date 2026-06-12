
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick,
  isActive = false
}) => {
  return (
    <button 
      onClick={onClick}
      className={`
        flex flex-col items-start p-6 rounded-xl border text-left transition-all duration-200 group w-full h-full
        ${isActive 
          ? 'bg-indigo-50 border-primary shadow-sm' 
          : 'bg-white border-gray-100 hover:border-primary/30 hover:shadow-md'
        }
      `}
    >
      <div className={`
        p-3 rounded-lg mb-4 transition-colors
        ${isActive ? 'bg-white text-primary' : 'bg-indigo-50 text-primary group-hover:bg-primary group-hover:text-white'}
      `}>
        <Icon size={24} />
      </div>
      <h3 className={`font-bold mb-1 ${isActive ? 'text-primary' : 'text-text-main'}`}>
        {title}
      </h3>
      <p className="text-sm text-text-muted leading-relaxed">
        {description}
      </p>
    </button>
  );
};
