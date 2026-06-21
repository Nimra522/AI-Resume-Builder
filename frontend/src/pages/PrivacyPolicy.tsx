
import React, { useEffect } from 'react';
import { Shield, Lock, User, Database, Eye, Server, Cookie, FileText, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/legal/SectionHeading';
import { TextBlock } from '../components/legal/TextBlock';
import { Card } from '../components/ui/Card';
import { ContactBox } from '../components/contact/ContactBox';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-12 pb-16 bg-gray-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-gray-900 to-indigo-900 border-b border-indigo-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 opacity-20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
            <Shield size={14} className="text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300 tracking-widest uppercase">Privacy Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl mb-6">
            How we collect, use, and protect your information.
          </p>
          <div className="inline-block px-6 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm font-semibold text-slate-300">
            Last updated: {currentDate}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Introduction */}
        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <TextBlock>
            <p className="text-lg leading-relaxed text-slate-700">
              Welcome to <strong className="text-slate-900">ResumeCraft</strong>. We are committed to protecting your personal information and your right to privacy.
              This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it. 
              By accessing or using our website and services, you agree to the terms of this Privacy Policy.
            </p>
          </TextBlock>
        </section>

        {/* Information We Collect */}
        <section>
          <SectionHeading title="Information We Collect" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card 
              variant="content"
              icon={User}
              title="Personal Information"
              description="Name, email address, phone number, and other contact details provided during registration."
            />
            <Card 
              variant="content"
              icon={FileText}
              title="Resume Data"
              description="Work history, education, skills, and other content you input to generate your resumes."
            />
            <Card 
              variant="content"
              icon={Lock}
              title="Credentials"
              description="Passwords and security information used for authentication and account access."
            />
            <Card 
              variant="content"
              icon={Database}
              title="Usage Data"
              description="Information about how you interact with our services, features used, and time spent."
            />
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <SectionHeading title="How We Use Your Information" />
          <div className="space-y-4 mt-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckCircle2 size={20} className="text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">To provide and manage your account</h4>
                <p className="text-slate-600 text-sm">We use your info to create your account, log you in, and manage your profile.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckCircle2 size={20} className="text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">To generate resume content</h4>
                <p className="text-slate-600 text-sm">Your input data is used to generate resumes accurately and format them professionally.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckCircle2 size={20} className="text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">To improve our services</h4>
                <p className="text-slate-600 text-sm">We analyze usage patterns to debug issues and develop new features.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckCircle2 size={20} className="text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Security and fraud prevention</h4>
                <p className="text-slate-600 text-sm">We use data to monitor for suspicious activity and protect our platform.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Storage & Security */}
        <section className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-2xl p-8 border border-indigo-950 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Server size={28} className="text-cyan-400" />
            <h3 className="text-2xl font-bold">Data Storage & Security</h3>
          </div>
          <TextBlock className="mb-0">
            <p className="text-slate-300">
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-300">
              <li>All sensitive data is encrypted at rest and in transit.</li>
              <li>Passwords are salted and hashed using industry standards.</li>
              <li>We perform regular security audits of our infrastructure.</li>
              <li><strong>We do not sell your personal data to third parties.</strong></li>
            </ul>
          </TextBlock>
        </section>

        {/* Third-Party Services */}
        <section>
          <SectionHeading title="Third-Party Services" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card 
              variant="content"
              title="Google Cloud" 
              description="Hosting and infrastructure services."
            />
            <Card 
              variant="content"
              title="Stripe" 
              description="Payment processing (if you subscribe to premium plans)."
            />
            <Card 
              variant="content"
              title="Twilio" 
              description="SMS notifications for account verification and updates."
            />
          </div>
        </section>

        {/* User Rights */}
        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <SectionHeading title="Your Privacy Rights" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
             <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                <Eye size={20} className="text-indigo-600" />
                <span className="font-medium text-slate-900">Right to access data</span>
             </div>
             <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                <FileText size={20} className="text-indigo-600" />
                <span className="font-medium text-slate-900">Right to correction</span>
             </div>
             <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                <Database size={20} className="text-indigo-600" />
                <span className="font-medium text-slate-900">Right to deletion</span>
             </div>
             <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                <Shield size={20} className="text-indigo-600" />
                <span className="font-medium text-slate-900">Right to withdraw consent</span>
             </div>
          </div>
        </section>

        {/* Cookies */}
        <section>
          <div className="flex items-center gap-3 mb-4">
             <Cookie size={24} className="text-indigo-600" />
             <SectionHeading title="Cookie Policy" className="mb-0" />
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <TextBlock>
              <p className="text-slate-700">
                We use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
              </p>
              <p className="mt-4 text-slate-700">
                <strong>Essential Cookies:</strong> Required for the website to function (e.g., login sessions).<br/>
                <strong>Analytics Cookies:</strong> Help us understand how you use our site.
              </p>
            </TextBlock>
          </div>
        </section>

        {/* Contact */}
        <section>
          <SectionHeading title="Contact Us" />
          <ContactBox 
            email="support@resumecraft.com"
            address="Okara, Pakistan"
            supportLink="/contact"
          />
        </section>

      </div>
    </div>
  );
};
