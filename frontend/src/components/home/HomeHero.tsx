import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useLocation } from '../layout/Navbar';

export const HomeHero: React.FC = () => {
  const { navigate } = useLocation();

  const handleCreateResume = () => {
    navigate('/templates');
  };

  return (
    <section className="relative pt-1 pb-6 md:pt-1 md:pb-2 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Hero Text */}
        <div className="space-y-8 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-main leading-tight tracking-tight">
            Create Your Professional <br />
            <span className="text-primary">Resume in Minutes</span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-lg leading-relaxed">
            Create ATS-friendly resumes in minutes with professional templates. 
            Stand out to recruiters with modern designs and polished layouts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleCreateResume}
              className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-primary hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Create Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link 
              to="/templates" 
              className="inline-flex justify-center items-center px-8 py-3.5 border border-gray-300 text-base font-semibold rounded-xl text-text-main bg-white hover:bg-gray-50 hover:text-primary transition-all duration-200"
            >
              View Templates
            </Link>
          </div>
          <div className="pt-4 flex items-center gap-4 text-sm text-text-muted">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden`}>
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
                </div>
              ))}
            </div>
            <p>Trusted by 10,000+ job seekers</p>
          </div>
        </div>

        {/* Hero Visual/Image */}
        <div className="relative lg:h-[600px] flex items-center justify-center">
          {/* Abstract Background Shapes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-indigo-100/50 to-cyan-100/50 rounded-full blur-3xl -z-10"></div>
          
          {/* Hero Image */}
          <img 
            src="/src/assets/Online_resume-amico (1).png" 
            alt="Online Resume Preview - Create professional resumes in minutes" 
            className="w-full max-w-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
};
