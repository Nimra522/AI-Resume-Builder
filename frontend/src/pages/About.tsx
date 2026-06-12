import React from 'react';
import { Link } from '../components/layout/Navbar';
import { Card } from '../components/ui/Card';
import { TeamCard } from '../components/about/TeamCard';
import { 
  Rocket, 
  Target, 
  FileText, 
  ShieldCheck, 
  LayoutGrid, 
  ArrowRight 
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-24 pb-12 animate-fade-in">
      
      {/* 1. Hero Section */}
      <section className="relative py-16 text-center max-w-4xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-r from-indigo-50 via-white to-cyan-50 blur-3xl -z-10 rounded-full opacity-60"></div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6 tracking-tight">
          Empowering Your <span className="text-primary">Career Journey</span>
        </h1>
        <p className="text-xl text-text-muted leading-relaxed mb-8">
          Our platform is a web-based resume builder designed to help users create professional, ATS-friendly resumes quickly using modern templates and an easy-to-use interface.
        </p>
      </section>

      {/* 2. Mission & Vision */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card 
            variant="section"
            title="Our Mission" 
            description="To make professional resume creation accessible to everyone, regardless of technical or design skills, by providing an intuitive platform that simplifies the resume-building process."
            icon={Rocket}
            delay="0.1s"
          />
          <Card 
            variant="section"
            title="Project Goal" 
            description="Demonstrating full-stack web development capabilities through a practical application that solves real-world challenges in the job market."
            icon={Target}
            delay="0.2s"
          />
        </div>
      </section>

      {/* 3. What We Offer */}
      <section className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-main mb-4">Key Features</h2>
          <p className="text-text-muted">Essential tools for creating professional resumes.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card 
            variant="section"
            title="Modern & Professional Templates"
            description="Choose from a variety of professionally designed templates that suit different industries and career levels."
            icon={LayoutGrid}
            className="bg-gray-50 border-none shadow-none"
            delay="0.1s"
          />
          <Card 
            variant="section"
            title="ATS-Friendly PDF Export"
            description="Export your resume as a PDF that's optimized for Applicant Tracking Systems to ensure it gets noticed by employers."
            icon={ShieldCheck}
            className="bg-gray-50 border-none shadow-none"
            delay="0.2s"
          />
          <Card 
            variant="section"
            title="Easy-to-Use Resume Editor"
            description="Intuitive drag-and-drop interface that makes editing and customizing your resume simple and efficient."
            icon={FileText}
            className="bg-gray-50 border-none shadow-none"
            delay="0.3s"
          />
        </div>
      </section>



      {/* 3. Call To Action */}
      <section className="py-12">
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent opacity-20 rounded-full blur-2xl transform translate-x-1/3 translate-y-1/3"></div>

          <h2 className="text-3xl font-bold mb-6 relative z-10">Ready to boost your career?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto relative z-10">
            Join thousands of professionals who have successfully landed their dream jobs using our platform.
          </p>
          <Link 
            to="/templates" 
            className="inline-flex items-center px-8 py-3 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all relative z-10"
          >
            Start Building Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

    </div>
  );
};