import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  icon: Icon, 
  error, 
  className = '', 
  ...props 
}) => {
  // No default restrictions - inputs are unrestricted by default
  // Validation is only applied when explicitly passed via props
  
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-medium text-text-main">
        {label}
      </label>
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors duration-200">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`
            block w-full rounded-lg border 
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'} 
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 
            text-text-main placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary 
            transition-all duration-200
            shadow-sm
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 animate-shake">{error}</p>
      )}
    </div>
  );
};