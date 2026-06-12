import React from 'react';
import { FileText } from 'lucide-react';
import { Link } from '../layout/Navbar';

interface AuthCardProps {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkTo,
  children
}) => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      
      {/* Header Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Link to="/" className="inline-flex items-center justify-center gap-2 mb-4 group">
          <div className="bg-primary text-white p-2 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-200">
            <FileText size={28} />
          </div>
          <span className="font-bold text-2xl text-text-main tracking-tight">ResumeCraft</span>
        </Link>
        <h2 className="text-3xl font-bold text-text-main tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {title}
        </h2>
        <p className="mt-2 text-sm text-text-muted animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {subtitle}
        </p>
      </div>

      {/* Main Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          {children}

          {/* Footer Link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-text-muted">
                {footerText}{' '}
                <Link to={footerLinkTo} className="font-medium text-primary hover:text-primary-dark transition-colors">
                  {footerLinkText}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};