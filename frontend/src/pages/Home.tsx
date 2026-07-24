
import React from 'react';
import { Link, useLocation } from '../components/layout/Navbar';
import { 
  LayoutTemplate, 
  Eye, 
  Download, 
  ArrowRight, 
  Star, 
  User,
  FileText,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { FeaturedTemplateCard } from '../components/templates/FeaturedTemplateCard';
import { HomeHero } from '../components/home/HomeHero';
import { TEMPLATES } from '../data/templates';

export const Home: React.FC = () => {
  const { navigate } = useLocation();

  // Select top 4 popular templates for the featured section
  const featuredTemplates = TEMPLATES.filter(t => 
    ['modern', 'professional', 'creative', 'executive'].includes(t.id)
  );

  const testimonials = [
    { name: 'Ishaan Mehta',  role: 'Marketing Manager',  color: '#7C3AED',
      text: 'The templates are fantastic! I built a professional resume quickly and got multiple interviews within a week.' },
    { name: 'Vivaan Kapoor', role: 'Software Engineer',   color: '#2563EB',
      text: 'Clean, modern designs that are ATS-friendly. The interface is intuitive and easy to use. Highly recommended!' },
    { name: 'Myra Nair',     role: 'Recent Graduate',     color: '#059669',
      text: 'As a new grad, this was perfect. The step-by-step process made resume building stress-free and simple.' },
    { name: 'Aarav Sharma',  role: 'Product Designer',    color: '#DC2626',
      text: 'The creative templates helped me stand out. I received interview calls from top tech companies.' },
    { name: 'Ananya Patel',  role: 'Data Analyst',        color: '#0891B2',
      text: 'Professional, clean, and easy to customize. The download process was seamless and fast.' },
    { name: 'Rohan Singh',   role: 'Sales Manager',       color: '#D97706',
      text: 'Great tool! I updated my resume in minutes and got a response from a recruiter the same day.' },
  ];

  // Duplicate for seamless infinite loop
  const marqueeItems = [...testimonials, ...testimonials];

  const handleCreateResume = () => {
    navigate('/templates');
  };

  return (
    <div className="space-y-12 pb-16 bg-gray-50">
      {/* 1. Hero Section - DO NOT CHANGE */}
      <HomeHero />

      {/* 2. Features Section */}
      <section className="pt-12 pb-16 bg-gradient-to-r from-gray-900 to-indigo-900 border-b border-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
              <CheckCircle2 size={14} className="text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-300 tracking-widest uppercase">Why Choose ResumeCraft</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Build a Resume That Gets You Hired
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Professional templates, intuitive tools, and smart guidance — everything you need to create a standout resume in minutes.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: LayoutTemplate,
                title: 'Expert-Designed Templates',
                desc: '100+ ATS-friendly templates crafted by career experts for different industries and experience levels.',
                iconColor: '#4f46e5',
                iconBg: '#eef2ff'
              },
              {
                icon: FileText,
                title: 'Easy to Use Editor',
                desc: 'Simple, intuitive interface with real-time preview and guided form fields.',
                iconColor: '#0284c7',
                iconBg: '#e0f2fe'
              },
              {
                icon: Zap,
                title: 'Fast & Efficient',
                desc: 'Create a professional resume in as little as 5 minutes with pre-built sections.',
                iconColor: '#7c3aed',
                iconBg: '#f3e8ff'
              },
              {
                icon: Download,
                title: 'Download & Share',
                desc: 'Export in PDF format optimized for ATS systems and easy sharing.',
                iconColor: '#059669',
                iconBg: '#d1fae5'
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-default border border-white/10 hover:border-indigo-400/40 hover:bg-white/15 hover:shadow-2xl"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: feature.iconBg }}
                >
                  <feature.icon size={28} color={feature.iconColor} />
                </div>
                <h3 className="font-bold text-white text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-indigo-100/80 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Templates Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Popular Templates
              </h2>
              <p className="text-gray-600">Browse our most loved resume designs.</p>
            </div>
            <Link to="/templates" className="text-primary font-semibold hover:text-primary-dark inline-flex items-center group transition-colors">
              View All Templates
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Template Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
             {featuredTemplates.map(template => (
                <FeaturedTemplateCard key={template.id} template={template} />
             ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-indigo-900 border-y border-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
              <Zap size={14} className="text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-300 tracking-widest uppercase">Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Three Steps to Your Perfect Resume
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
              Building a professional resume has never been easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {[
              {
                icon: User,
                step: "1",
                title: "Enter Your Information",
                desc: "Fill in your personal details, experience, education, and skills using our simple forms."
              },
              {
                icon: LayoutTemplate,
                step: "2",
                title: "Choose a Template",
                desc: "Pick a professionally designed template that matches your industry and personal style."
              },
              {
                icon: Download,
                step: "3",
                title: "Download & Apply",
                desc: "Export your resume as a PDF and start applying for jobs immediately."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <item.icon size={32} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700 shadow-md">
                    <span className="text-cyan-300 font-bold text-sm">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 max-w-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section — Infinite Auto-Scroll Marquee */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* CSS keyframe injected inline */}
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            animation: marquee 28s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
          .testimonial-card {
            width: calc((min(100vw, 1280px) - 8.5rem) / 4);
            min-width: 240px;
            flex-shrink: 0;
          }
          @media (max-width: 1200px) {
            .testimonial-card {
              width: calc((min(100vw, 1280px) - 7rem) / 3);
            }
          }
          @media (max-width: 768px) {
            .testimonial-card {
              width: calc((min(100vw, 1280px) - 5.5rem) / 2);
            }
          }
          @media (max-width: 480px) {
            .testimonial-card {
              width: calc(100vw - 2rem);
            }
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-100 mb-6">
              <Star size={14} className="text-yellow-600 fill-yellow-600" />
              <span className="text-xs font-semibold text-yellow-700 tracking-widest uppercase">Trusted by Many</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-lg">Real stories from real job seekers who found success.</p>
          </div>

          {/* Constrained marquee — inside max-w container */}
          <div style={{ overflow: 'hidden', width: '100%', borderRadius: '1rem' }}>
            <div
              className="marquee-track"
              style={{ display: 'flex', gap: '1.5rem', width: 'max-content', padding: '0.5rem 0 1.5rem' }}
            >
              {marqueeItems.map((t, idx) => (
                <div
                  key={idx}
                  className="testimonial-card"
                  style={{
                    background: '#fff',
                    border: '1px solid #EDE9FE',
                    borderRadius: '1rem',
                    padding: '1.75rem',
                    boxShadow: '0 2px 12px rgba(124,58,237,0.07)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    cursor: 'default',
                    userSelect: 'none',
                  }}
                >
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={15} style={{ color: '#F59E0B' }} fill="#F59E0B" />
                    ))}
                  </div>
                  {/* Review */}
                  <p style={{ color: '#374151', fontSize: '0.875rem', lineHeight: '1.6', flex: 1 }}>
                    "{t.text}"
                  </p>
                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #F3F4F6' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg, ${t.color}22, ${t.color}44)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '1rem', color: t.color,
                    }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1E1B4B', margin: 0 }}>{t.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: 0 }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 opacity-20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">Ready to Land Your Dream Job?</h2>
            <p className="text-indigo-200 text-xl">
              Join thousands of professionals who've built standout resumes with ResumeCraft. Start for free today!
            </p>
            <button 
              onClick={handleCreateResume}
              className="inline-flex items-center px-10 py-5 bg-white text-indigo-900 font-bold text-xl rounded-2xl shadow-2xl hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="ml-3 h-6 w-6" />
            </button>
            <p className="text-sm text-indigo-300">No credit card required · Cancel anytime</p>
          </div>
        </div>
      </section>
    </div>
  );
};
