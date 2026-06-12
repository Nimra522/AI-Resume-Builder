import React, { useEffect } from 'react';
import { Mail, MapPin, Clock } from 'lucide-react'; // Removed Phone import
import { ContactForm } from '../components/contact/ContactForm';
import { Card } from '../components/ui/Card';
import { MapBox } from '../components/contact/MapBox';
import { FAQItem } from '../components/faq/FAQItem';

export const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pb-12 animate-fade-in">
      {/* 1. Hero Section */}
      <section className="relative py-16 md:py-24 text-center max-w-4xl mx-auto px-4">
        {/* Decorative Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-indigo-50/50 via-white to-transparent blur-3xl -z-10 rounded-full opacity-70"></div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6 tracking-tight">
          Contact <span className="text-primary">Us</span>
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-2xl mx-auto">
          For inquiries regarding our resume templates, features, or technical support, please feel free to contact us.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Info & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col">
            <div className="grid grid-cols-1 gap-4">
              <Card 
                variant="info"
                icon={MapPin}
                title="Our Location"
                description="Developed in Pakistan."
                detail="Okara, Pakistan"
              />
              <Card 
                variant="info"
                icon={Mail}
                title="Email Us"
                description="Our friendly team is here to help."
                detail="support@resumecraft.com"
              />
              <Card 
                variant="info"
                icon={Clock}
                title="Response Time"
                description="We aim to respond within 24–48 hours."
                detail=""
              />
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

        {/* FAQ Section */}
        <section className="mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-main mb-4">Frequently Asked Questions</h2>
            <p className="text-text-muted">Quick answers to questions you may have.</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <FAQItem 
              question="How long does it take to get a response?" 
              answer="We typically respond to all inquiries within 24 hours via email. For urgent technical issues, please check our help center resources first." 
            />
            <FAQItem 
              question="Can I request support for specific resume templates?" 
              answer="Absolutely! If you're having trouble formatting a specific template, let us know the template name in your message and we'll guide you through it." 
            />
            <FAQItem 
              question="Do you offer live chat support?" 
              answer="Currently, we offer email support to ensure we can provide detailed and accurate assistance. We are working on adding live chat in the near future." 
            />
            <FAQItem 
              question="Is my personal data secure?" 
              answer="Yes, we take security seriously. All your personal information and resume data are encrypted and stored securely using industry-standard protocols." 
            />
          </div>
        </section>
      </div>
    </div>
  );
};