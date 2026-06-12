
import React from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

interface FormSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  onRemove?: () => void;
  children: React.ReactNode;
  subtitle?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  isOpen, 
  onToggle, 
  onRemove, 
  children,
  subtitle
}) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-visible mb-3 transition-all duration-200 hover:shadow-sm">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={onToggle}
      >
        <div className="flex flex-col">
          <span className="font-semibold text-text-main text-sm">{title}</span>
          {subtitle && <span className="text-xs text-text-muted mt-0.5">{subtitle}</span>}
        </div>
        <div className="flex items-center gap-2">
          {onRemove && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
              title="Remove Item"
            >
              <Trash2 size={16} />
            </button>
          )}
          <button className="text-gray-400">
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>
      
      {/* Animated Content */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-visible ${
          isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 border-t border-gray-100 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};
