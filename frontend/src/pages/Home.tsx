
import React from 'react';
import { Link, useLocation } from '../components/layout/Navbar';
import { 
  LayoutTemplate, 
  Eye, 
  Download, 
  ArrowRight, 
  Star, 
  User
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

  const handleCreateResume = () => {
   navigate('/templates');
  };


  return (
    <div className="space-y-24 pb-24">
      {/* 1. Hero Section */}
      <HomeHero />

      {/* 2. Features Section */}
      <section className="py-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-text-main mb-4">Why Choose ResumeCraft?</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Professional templates, easy steps, and resumes that stand out to employers with modern designs and polished layout.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Star,
              title: "Role-Specific Templates",
              desc: "10+ templates designed for different career levels and industries."
            },
            {
              icon: LayoutTemplate,
              title: "Modern Templates",
              desc: "10+ professional designs tailored for various industries."
            },
            {
              icon: Eye,
              title: "Live Preview",
              desc: "See changes instantly as you edit your document in real-time."
            },
            {
              icon: Download,
              title: "One-Click Export",
              desc: "Download in PDF formats perfectly formatted for ATS."
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-50 text-primary rounded-xl flex items-center justify-center mb-4">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-2">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Templates Section */}
      <section className="py-12 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-text-main mb-2">Featured Templates</h2>
              <p className="text-text-muted">Check out our most popular resume designs.</p>
            </div>
            <Link to="/templates" className="text-primary font-semibold hover:text-primary-dark inline-flex items-center group">
              View All Templates
              <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Horizontal Scrollable Container */}
          <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide">
             {featuredTemplates.map(template => (
               <FeaturedTemplateCard key={template.id} template={template} />
             ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="py-16 bg-white rounded-3xl px-8 shadow-sm border border-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-text-main mb-4">How It Works</h2>
          <p className="text-text-muted">Three simple steps to your dream job.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-200 via-indigo-200 to-gray-200 -z-0"></div>

          {[
            {
              icon: User,
              step: "01",
              title: "Enter Your Details",
              desc: "Fill in your experience, skills, and education manually with our guided forms."
            },
            {
              icon: LayoutTemplate,
              step: "02",
              title: "Choose a Template",
              desc: "Select a professionally designed template that fits your style and industry."
            },
            {
              icon: Download,
              step: "03",
              title: "Download & Apply",
              desc: "Export your polished resume and start applying to jobs immediately."
            }
          ].map((item, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white border-4 border-indigo-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center">
                  <item.icon size={28} />
                </div>
              </div>
              <div className="inline-block px-3 py-1 bg-indigo-50 text-primary font-bold text-xs rounded-full mb-3">
                STEP {item.step}
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">{item.title}</h3>
              <p className="text-text-muted text-sm max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-text-main text-center mb-12">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Ishaan Mehta",
              role: "Marketing Manager",
              text: "The professional templates made my resume look amazing. I created a polished resume in 15 minutes and got 3 interviews the next week."
            },
            {
              name: "Vivaan Kapoor",
              role: "Software Engineer",
              text: "Clean templates that pass ATS scans easily. I love the minimalist design options. Highly recommended!"
            },
            {
              name: "Myra Nair",
              role: "Recent Graduate",
              text: "As a fresh grad, I was struggling with resume formatting. The step-by-step process and templates helped me create a professional resume easily."
            }
          ].map((t, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
              </div>
              <p className="text-text-main mb-6 leading-relaxed italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} alt={t.name} />
                </div>
                <div>
                  <p className="font-bold text-sm text-text-main">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-16">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400 opacity-20 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Start Building Your Resume Now</h2>
            <p className="text-indigo-100 text-lg">
              Join thousands of professionals who have advanced their careers with ResumeCraft.
              Try it for free today.
            </p>
            <button 
              onClick={handleCreateResume}
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-bold text-lg rounded-xl shadow-lg hover:bg-gray-50 transition-colors"
            >
              Get Started For Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <p className="text-sm text-indigo-200 mt-4">No credit card required</p>
          </div>
        </div>
      </section>
    </div>
  );
};
