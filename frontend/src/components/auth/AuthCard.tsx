import React from 'react';
import { FileText, ShieldCheck, Zap, Sparkles } from 'lucide-react';
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
    <div className="min-h-[75vh] flex items-center justify-center py-6 sm:py-12 animate-fade-in">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        
        {/* Left Side: Brand Visual (only on desktop/tablet) */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-gray-900 via-indigo-950 to-slate-900 p-8 flex-col justify-between relative text-white overflow-hidden">
          {/* Background decoration blur */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl transform translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl transform -translate-x-12 translate-y-12"></div>

          {/* Logo */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="bg-white/10 text-white p-2 rounded-xl backdrop-blur-md border border-white/10 transform group-hover:scale-105 transition-all duration-300">
                <FileText size={22} className="text-indigo-300" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Resume<span className="text-indigo-400">Craft</span>
              </span>
            </Link>
          </div>

          {/* Marketing Copy & Features */}
          <div className="relative z-10 my-auto space-y-8 pr-2">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-xs font-semibold text-indigo-300">
                <Sparkles size={12} className="animate-pulse" />
                AI Powered
              </span>
              <h3 className="text-2xl font-bold leading-tight">Create a Job-Winning Resume in Minutes</h3>
            </div>
            
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
                <span>Smart AI-powered content and tailored bullet suggestions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
                <span>10+ modern, clean, and ATS-friendly templates.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
                <span>Fast PDF exports with high-fidelity formatting.</span>
              </li>
            </ul>
          </div>

          {/* Left Side Footer */}
          <div className="relative z-10 border-t border-white/10 pt-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              Join thousands of professionals securing interviews at top companies worldwide.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="col-span-1 md:col-span-7 p-8 sm:p-10 md:p-12 flex flex-col justify-center bg-white">
          <div className="w-full max-w-sm mx-auto space-y-6">
            
            {/* Header Title (Left-aligned for split layout) */}
            <div>
              {/* Logo visible only on mobile */}
              <div className="md:hidden flex items-center gap-2 mb-6">
                <Link to="/" className="inline-flex items-center gap-2">
                  <div className="bg-primary text-white p-2 rounded-xl shadow-md">
                    <FileText size={20} />
                  </div>
                  <span className="font-bold text-lg text-text-main tracking-tight">ResumeCraft</span>
                </Link>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {title}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {subtitle}
              </p>
            </div>

            {/* Children Form Fields */}
            <div className="space-y-4">
              {children}
            </div>

            {/* Separator / Footer Links */}
            {footerText && (
              <div className="border-t border-gray-100 pt-6 text-center">
                <p className="text-sm text-gray-500">
                  {footerText}{' '}
                  <Link to={footerLinkTo} className="font-semibold text-primary hover:text-primary-dark transition-colors">
                    {footerLinkText}
                  </Link>
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};