
import React from 'react';
import { Link, useLocation } from '../components/layout/Navbar';
import { 
  Rocket, 
  Target, 
  FileText, 
  ShieldCheck, 
  LayoutGrid, 
  CheckCircle2,
  Heart,
  Zap,
  Users,
  Sparkles,
  TrendingUp
} from 'lucide-react';

export const About: React.FC = () => {
  const { navigate } = useLocation();

  const stats = [
    { number: '10K+', label: 'Happy Users', icon: Users, iconColor: '#4f46e5', iconBg: '#eef2ff' },
    { number: '15+', label: 'Templates', icon: LayoutGrid, iconColor: '#0284c7', iconBg: '#e0f2fe' },
    { number: '50K+', label: 'Resumes Built', icon: FileText, iconColor: '#7c3aed', iconBg: '#f3e8ff' },
    { number: '98%', label: 'Satisfaction', icon: Heart, iconColor: '#059669', iconBg: '#d1fae5' },
  ];

  return (
    <div className="space-y-12 pb-16 bg-gray-50">
      
      {/* 1. Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-gray-900 to-indigo-900 border-b border-indigo-950 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
              <Sparkles size={14} className="text-yellow-400" />
              <span className="text-xs font-semibold text-indigo-300 tracking-widest uppercase">About ResumeCraft</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Empowering Your Career Journey
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              We're on a mission to help job seekers create professional, ATS-friendly resumes that stand out from the crowd.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-12 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-default border border-gray-100 hover:border-indigo-200 hover:shadow-2xl"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: stat.iconBg }}
                >
                  <stat.icon size={28} color={stat.iconColor} />
                </div>
                <h3 className="font-bold text-gray-900 text-2xl mb-2 text-center">{stat.number}</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
            <Rocket size={14} className="text-indigo-600" />
            <span className="text-xs font-semibold text-indigo-700 tracking-widest uppercase">Our Purpose</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Why We Started This Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            We believe everyone deserves a chance to shine in their career, and a great resume is the first step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="group bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-default border border-gray-100 hover:border-indigo-200 hover:shadow-2xl"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-indigo-600 to-purple-600"
            >
              <Rocket size={28} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-3">Our Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To make professional resume creation accessible to everyone, regardless of technical or design skills, by providing an intuitive platform that simplifies the resume-building process.
            </p>
          </div>

          <div
            className="group bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-default border border-gray-100 hover:border-indigo-200 hover:shadow-2xl"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-cyan-600 to-blue-600"
            >
              <Target size={28} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-3">Our Vision</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To become the go-to platform for job seekers worldwide, helping them build resumes that open doors to their dream careers.
            </p>
          </div>
        </div>
      </section>

      {/* 4. What We Offer */}
      <section className="pt-12 pb-16 bg-gradient-to-r from-gray-900 to-indigo-900 border-y border-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
              <CheckCircle2 size={14} className="text-green-400" />
              <span className="text-xs font-semibold text-green-300 tracking-widest uppercase">Key Features</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              What Sets Us Apart
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Essential tools for creating professional resumes that get noticed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-default border border-white/10 hover:border-indigo-400/40 hover:bg-white/15 hover:shadow-2xl"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-purple-600 to-pink-600"
              >
                <LayoutGrid size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-3">Modern & Professional Templates</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed">
                Choose from a variety of professionally designed templates that suit different industries and career levels.
              </p>
            </div>

            <div
              className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-default border border-white/10 hover:border-indigo-400/40 hover:bg-white/15 hover:shadow-2xl"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-green-600 to-emerald-600"
              >
                <ShieldCheck size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-3">ATS-Friendly PDF Export</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed">
                Export your resume as a PDF that's optimized for Applicant Tracking Systems to ensure it gets noticed by employers.
              </p>
            </div>

            <div
              className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-default border border-white/10 hover:border-indigo-400/40 hover:bg-white/15 hover:shadow-2xl"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-orange-600 to-red-600"
              >
                <FileText size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-3">Easy-to-Use Resume Editor</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed">
                Intuitive drag-and-drop interface that makes editing and customizing your resume simple and efficient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Values */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-100 mb-6">
            <Heart size={14} className="text-yellow-600" />
            <span className="text-xs font-semibold text-yellow-700 tracking-widest uppercase">Our Values</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            What Guides Us Every Day
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            The principles that shape everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Heart, title: 'Care', desc: 'We care deeply about your career success and are here to support you every step of the way.', iconColor: '#DC2626', iconBg: '#FEE2E2' },
            { icon: CheckCircle2, title: 'Quality', desc: 'We never compromise on the quality of our service and always strive for excellence.', iconColor: '#059669', iconBg: '#D1FAE5' },
            { icon: TrendingUp, title: 'Innovation', desc: 'We constantly improve our platform with new features to help you stay ahead in your job search.', iconColor: '#7C3AED', iconBg: '#F3E8FF' },
          ].map((value, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-default border border-gray-100 hover:border-indigo-200 hover:shadow-2xl"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ background: value.iconBg }}
              >
                <value.icon size={28} color={value.iconColor} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
