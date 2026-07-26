
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
  Users,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  Layers
} from 'lucide-react';

export const About: React.FC = () => {
  const { navigate } = useLocation();

  const stats = [
    { number: '100+', label: 'Templates', icon: LayoutGrid, iconColor: '#0284c7', iconBg: '#e0f2fe' },
    { number: 'AI', label: 'Writing Assistant', icon: BrainCircuit, iconColor: '#7c3aed', iconBg: '#f3e8ff' },
    { number: '7', label: 'Free Templates', icon: Users, iconColor: '#4f46e5', iconBg: '#eef2ff' },
    { number: 'PDF', label: 'Export Ready', icon: FileText, iconColor: '#059669', iconBg: '#d1fae5' },
  ];

  return (
    <div className="space-y-12 pb-16 bg-gray-50">

      {/* 1. Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-gray-900 to-indigo-900 border-b border-indigo-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
              <Sparkles size={14} className="text-yellow-400" />
              <span className="text-xs font-semibold text-indigo-300 tracking-widest uppercase">About ResumeCraft</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Helping You Build a Resume That Works
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              ResumeCraft combines a library of professional templates with AI-powered writing tools to help you create a resume that gets results — no design experience needed.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Stats / Highlights Section */}
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
            Why We Built ResumeCraft
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Job hunting is hard enough. Your resume should not be another obstacle. We built ResumeCraft to remove the friction from creating a professional resume so you can focus on landing the role.
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
              To simplify resume creation for every job seeker by combining an intuitive editor, a wide selection of templates, and AI-powered writing assistance — all in one platform.
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
              A world where every job seeker can present their best self on paper — without hiring a designer or wrestling with formatting tools.
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
              Practical tools designed to make your resume stand out.
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
              <h3 className="font-bold text-white text-lg mb-3">100+ Professional Templates</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed">
                Choose from a large library of professionally designed templates across free, pro, and premium tiers suitable for every industry and career level.
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
              <h3 className="font-bold text-white text-lg mb-3"> Professional PDF Export</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed">
                Download your resume as a professionally formatted PDF, ready to share with employers and recruiters.
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
              <h3 className="font-bold text-white text-lg mb-3">AI-Powered Writing Tools</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed">
                Generate bullet points, rewrite experience descriptions, and get smart skill suggestions with built-in AI assistance powered by Gemini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose ResumeCraft */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-6">
            <Layers size={14} className="text-cyan-600" />
            <span className="text-xs font-semibold text-cyan-700 tracking-widest uppercase">Why ResumeCraft</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Built for Job Seekers, by Job Seekers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Every feature in ResumeCraft exists to solve a real problem in the resume-building process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start gap-5 bg-white rounded-2xl p-7 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-1">
              <LayoutGrid size={22} className="text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Start Fast with a Template</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Pick a template that fits your style. Every template is designed to be complete and polished right from the start.</p>
            </div>
          </div>

          <div className="flex items-start gap-5 bg-white rounded-2xl p-7 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 mt-1">
              <BrainCircuit size={22} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Write Better with AI</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Stuck on a summary or bullet point? Use the AI assistant to generate content, improving experience descriptions, and creating professional summaries.</p>
            </div>
          </div>

          <div className="flex items-start gap-5 bg-white rounded-2xl p-7 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 mt-1">
              <CheckCircle2 size={22} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Form-Based Editor, No Design Skills Needed</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Fill in your details step by step. The editor handles layout, spacing, and formatting so you do not have to touch a single CSS rule.</p>
            </div>
          </div>

          <div className="flex items-start gap-5 bg-white rounded-2xl p-7 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 mt-1">
              <TrendingUp size={22} className="text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Professional PDF Export</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Download your completed resume as a professionally formatted PDF that is ready to share with employers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Values */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-indigo-900 border-y border-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
              <Heart size={14} className="text-yellow-400" />
              <span className="text-xs font-semibold text-yellow-300 tracking-widest uppercase">Our Values</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              What Guides Us Every Day
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              The principles that shape everything we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-default border border-white/10 hover:border-indigo-400/40 hover:bg-white/15 hover:shadow-2xl">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-red-500 to-rose-600">
                <Heart size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-3">Care</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed">We care about your career success and build features that genuinely help, not just impress.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-default border border-white/10 hover:border-indigo-400/40 hover:bg-white/15 hover:shadow-2xl">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-emerald-500 to-teal-600">
                <CheckCircle2 size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-3">Quality</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed">Every template and tool is crafted with attention to detail so your resume looks its best.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-default border border-white/10 hover:border-indigo-400/40 hover:bg-white/15 hover:shadow-2xl">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-violet-500 to-purple-600">
                <TrendingUp size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-3">Innovation</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed">We continuously improve the platform with new features driven by real user needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-12 border border-indigo-100 shadow-sm">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FileText size={28} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Ready to Build Your Resume?
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-8 text-lg leading-relaxed">
            No account required to get started. Pick a template and begin creating your professional resume in minutes.
          </p>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Browse Templates <Rocket size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
};
