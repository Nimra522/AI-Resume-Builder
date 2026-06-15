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
    <section className="relative pt-2 pb-3 md:pt-2 md:pb-4 overflow-visible">
      <div className="absolute inset-x-0 top-0 -z-10 h-48 rounded-b-[3rem] bg-gradient-to-r from-indigo-100/60 via-white to-cyan-100/60 blur-3xl" />
      <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-4 lg:gap-6 items-center">
        {/* Hero Text */}
        <div className="space-y-4 z-10 lg:pr-4 lg:pt-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
            <Sparkles size={12} className="text-primary" />
            AI-Powered Resume Builder
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-text-main leading-tight tracking-tight">
            Create Your Professional <br />
            <span className="text-primary">Resume in Minutes</span>
          </h1>
          <p className="text-base md:text-lg text-text-muted max-w-md leading-relaxed">
            Create ATS-friendly resumes in minutes with professional templates. 
            Stand out to recruiters with modern designs and polished layouts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleCreateResume}
              className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-2xl text-white bg-primary hover:bg-primary-dark shadow-lg shadow-indigo-200/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Create Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link 
              to="/templates" 
              className="inline-flex justify-center items-center px-8 py-3.5 border border-gray-200 text-base font-semibold rounded-2xl text-text-main bg-white hover:bg-gray-50 hover:text-primary shadow-sm hover:shadow-md transition-all duration-200"
            >
              View Templates
            </Link>
          </div>
          <div className="pt-1 flex items-center gap-4 text-sm text-text-muted">
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-gray-100 bg-white/90 px-4 py-2 shadow-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <p className="text-sm text-text-muted">Trusted by 10,000+ job seekers nationwide</p>
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-primary">4.5/5 recruiter-ready</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative flex items-center justify-center lg:justify-end py-0 lg:py-0 overflow-visible">
          {/* Abstract Background Shapes */}
          <div className="absolute inset-0 z-0 rounded-[2rem] bg-gradient-to-tr from-indigo-100/70 via-white to-cyan-100/70 blur-3xl opacity-90"></div>
          <div className="absolute -top-4 left-4 z-0 h-20 w-20 rounded-full bg-indigo-200/40 blur-2xl" />
          <div className="absolute bottom-4 right-8 z-0 h-24 w-24 rounded-full bg-cyan-200/40 blur-2xl" />
          <HeroBackgroundPattern />
          <div className="relative z-10 w-full max-w-[500px] lg:max-w-[520px]">
            <HeroResumeVisual />
          </div>
        </div>
      </div>
    </section>
  );
};
