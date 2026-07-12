
import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          wrapper: 'bg-white border-green-100 text-gray-800',
          icon: 'bg-green-100 text-green-600',
          IconComponent: CheckCircle2
        };
      case 'error':
        return {
          wrapper: 'bg-white border-red-100 text-gray-800',
          icon: 'bg-red-100 text-red-600',
          IconComponent: AlertCircle
        };
      case 'warning':
        return {
          wrapper: 'bg-white border-yellow-100 text-gray-800',
          icon: 'bg-yellow-100 text-yellow-600',
          IconComponent: AlertTriangle
        };
      case 'info':
      default:
        return {
          wrapper: 'bg-white border-blue-100 text-gray-800',
          icon: 'bg-blue-100 text-blue-600',
          IconComponent: Info
        };
    }
  };

  const { wrapper, icon, IconComponent } = getStyles();

  return (
    <div className={`
      fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-fade-in-up
      ${wrapper}
    `}>
      <div className={`
        p-1.5 rounded-full 
        ${icon}
      `}>
        <IconComponent size={18} />
      </div>
      <p className="text-sm font-medium">{message}</p>
      <button 
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};
