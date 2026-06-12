
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
    <div className="animate-fade-in pb-12">
      {/* 1. Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border border-indigo-100 shadow-sm mb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-xl text-primary mb-6 shadow-sm border border-gray-100">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xl text-text-muted mb-6">
            How we collect, use, and protect your information.
          </p>
          <div className="inline-block px-4 py-1.5 bg-gray-50 rounded-full text-sm font-medium text-text-muted border border-gray-200">
            Last updated: {currentDate}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 3. Introduction */}
        <section>
          <TextBlock>
            <p>
              Welcome to <strong>ResumeCraft</strong>. We are committed to protecting your personal information and your right to privacy.
              This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it. 
              By accessing or using our website and services, you agree to the terms of this Privacy Policy.
            </p>
          </TextBlock>
        </section>

        {/* 4. Information We Collect */}
        <section>
          <SectionHeading title="Information We Collect" />
          <TextBlock>
            <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.</p>
          </TextBlock>
          
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

        {/* 5. How We Use Your Information */}
        <section>
          <SectionHeading title="How We Use Your Information" />
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckCircle2 size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-text-main">To provide and manage your account</h4>
                <p className="text-text-muted text-sm">We use your info to create your account, log you in, and manage your profile.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckCircle2 size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-text-main">To generate resume content</h4>
                <p className="text-text-muted text-sm">Your input data is used to generate resumes accurately and format them professionally.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckCircle2 size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-text-main">To improve our services</h4>
                <p className="text-text-muted text-sm">We analyze usage patterns to debug issues and develop new features.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckCircle2 size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-text-main">Security and fraud prevention</h4>
                <p className="text-text-muted text-sm">We use data to monitor for suspicious activity and protect our platform.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Data Storage & Security */}
        <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Server size={24} className="text-primary" />
            <h3 className="text-2xl font-bold text-text-main">Data Storage & Security</h3>
          </div>
          <TextBlock className="mb-0">
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>All sensitive data is encrypted at rest and in transit.</li>
              <li>Passwords are salted and hashed using industry standards.</li>
              <li>We perform regular security audits of our infrastructure.</li>
              <li><strong>We do not sell your personal data to third parties.</strong></li>
            </ul>
          </TextBlock>
        </section>

        {/* 7. Third-Party Services */}
        <section>
          <SectionHeading title="Third-Party Services" />
          <TextBlock>
            <p>
              We may share data with the following third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work.
            </p>
          </TextBlock>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* 8. User Rights */}
        <section>
          <SectionHeading title="Your Privacy Rights" />
          <TextBlock>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          </TextBlock>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-white">
                <Eye size={20} className="text-primary" />
                <span className="font-medium text-text-main">Right to access data</span>
             </div>
             <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-white">
                <FileText size={20} className="text-primary" />
                <span className="font-medium text-text-main">Right to correction</span>
             </div>
             <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-white">
                <Database size={20} className="text-primary" />
                <span className="font-medium text-text-main">Right to deletion</span>
             </div>
             <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-white">
                <Shield size={20} className="text-primary" />
                <span className="font-medium text-text-main">Right to withdraw consent</span>
             </div>
          </div>
        </section>

        {/* 9. Cookies */}
        <section>
          <div className="flex items-center gap-3 mb-4">
             <Cookie size={24} className="text-primary" />
             <SectionHeading title="Cookie Policy" className="mb-0" />
          </div>
          <TextBlock>
            <p>
              We use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
            </p>
            <p className="mt-4">
              <strong>Essential Cookies:</strong> Required for the website to function (e.g., login sessions).<br/>
              <strong>Analytics Cookies:</strong> Help us understand how you use our site.
            </p>
          </TextBlock>
        </section>

        {/* 11. Contact */}
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
