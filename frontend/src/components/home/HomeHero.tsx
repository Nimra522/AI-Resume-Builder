
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link, useLocation } from '../layout/Navbar';
import { HeroBackgroundPattern } from './HeroBackgroundPattern';
import { HeroResumeVisual } from './HeroResumeVisual';

export const HomeHero: React.FC = () => {
  const { navigate } = useLocation();

  const handleCreateResume = () => {
    navigate('/templates');
  };

  return (
    <section className="relative pt-6 pb-16 md:pt-10 md:pb-20 overflow-visible">
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 -z-10 h-80 rounded-b-[3rem] bg-gradient-to-r from-indigo-100/70 via-white to-cyan-100/70 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Hero Text */}
          <div className="space-y-6 z-10 lg:pt-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/95 px-4 py-2 text-xs font-semibold text-primary shadow-md backdrop-blur">
              <Sparkles size={14} className="text-primary" />
              AI-Powered Resume Builder
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-[3.8rem] font-bold text-gray-900 leading-tight tracking-tight">
              Create Your Professional
              <br />
              <span className="text-primary">Resume in Minutes</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
              Create ATS-friendly resumes in minutes with professional templates.
              Stand out to recruiters with modern designs and polished layouts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleCreateResume}
                className="inline-flex justify-center items-center px-10 py-4 border border-transparent text-base font-bold rounded-2xl text-white bg-primary hover:bg-primary-dark shadow-lg shadow-indigo-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Create Resume
                <ArrowRight className="ml-3 h-6 w-6" />
              </button>
              <Link
                to="/templates"
                className="inline-flex justify-center items-center px-10 py-4 border border-gray-200 text-base font-bold rounded-2xl text-gray-900 bg-white hover:bg-gray-50 hover:text-primary shadow-md hover:shadow-lg transition-all duration-300"
              >
                View Templates
              </Link>
            </div>
            <div className="pt-4 flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white/95 px-6 py-3 shadow-md backdrop-blur">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-sm text-gray-700 font-medium">Trusted by 10,000+ job seekers nationwide</p>
                <span className="rounded-full bg-indigo-50 px-4 py-1 text-xs font-bold text-primary">4.5/5 recruiter-ready</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex items-center justify-center lg:justify-end py-8 lg:py-0 overflow-visible">
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 z-0 rounded-[2.5rem] bg-gradient-to-tr from-indigo-100/80 via-white to-cyan-100/80 blur-3xl opacity-90"></div>
            <div className="absolute -top-6 left-2 z-0 h-24 w-24 rounded-full bg-indigo-200/50 blur-2xl" />
            <div className="absolute bottom-6 right-4 z-0 h-28 w-28 rounded-full bg-cyan-200/50 blur-2xl" />
            <HeroBackgroundPattern />
            <div className="relative z-10 w-full max-w-[550px] lg:max-w-[580px]">
              <HeroResumeVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
