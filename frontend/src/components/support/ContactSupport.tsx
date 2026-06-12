import React from 'react';
import { Mail } from 'lucide-react';

export const ContactSupport: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border border-indigo-100 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-sm border border-gray-200">
          <Mail className="text-primary" size={24} />
        </div>
        
        <h3 className="text-xl font-bold text-text-main mb-3">
          Need Further Assistance?
        </h3>
        
        <p className="text-text-muted mb-6 max-w-2xl mx-auto">
          If you need further assistance, please contact us at{' '}
          <a 
            href="mailto:support@resumecraft.com" 
            className="text-primary font-semibold hover:underline"
          >
            support@resumecraft.com
          </a>
          . Our team typically responds within 24–48 hours.
        </p>
        
        <div className="inline-flex items-center gap-2 text-sm text-text-muted bg-white px-4 py-2 rounded-full border border-gray-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Support team available</span>
        </div>
      </div>
    </div>
  );
};