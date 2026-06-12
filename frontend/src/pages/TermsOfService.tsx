
import React, { useEffect } from 'react';
import { FileText, UserCheck, AlertTriangle, CreditCard, ShieldBan, Gavel, RefreshCw, Scale } from 'lucide-react';
import { SectionHeading } from '../components/legal/SectionHeading';
import { TextBlock } from '../components/legal/TextBlock';
import { ContactBox } from '../components/contact/ContactBox';
import { Card } from '../components/ui/Card';

export const TermsOfService: React.FC = () => {
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
            <Scale size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xl text-text-muted mb-6">
            Please read these terms carefully before using our services.
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
            <p className="text-lg">
              Welcome to <strong>ResumeCraft</strong>. By accessing or using our website, resume templates, and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </TextBlock>
        </section>

        {/* 4. User Accounts */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <UserCheck size={24} className="text-primary" />
            <SectionHeading title="User Accounts" className="mb-0" />
          </div>
          <TextBlock>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
          </TextBlock>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-xl my-6">
            <h4 className="flex items-center font-bold text-orange-800 mb-2">
              <AlertTriangle size={18} className="mr-2" />
              Security Responsibility
            </h4>
            <p className="text-orange-700 text-sm leading-relaxed">
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
            </p>
          </div>
        </section>

        {/* 5. Use of Services */}
        <section>
          <SectionHeading title="Acceptable Use" />
          <TextBlock>
            <p>
              You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service.</li>
            </ul>
          </TextBlock>
        </section>

        {/* 6. Content Ownership */}
        <section>
          <SectionHeading title="Content Ownership" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              variant="content"
              title="Your Content"
              description="You retain all rights to the resume content, personal data, and career history you input into our platform. We claim no ownership over your personal documents."
              icon={FileText}
            />
            <Card 
              variant="content"
              title="Our IP"
              description="The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of ResumeCraft."
              icon={ShieldBan}
            />
          </div>
        </section>

        {/* 7. Payment & Refunds */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <CreditCard size={24} className="text-primary" />
            <SectionHeading title="Payment & Refunds" className="mb-0" />
          </div>
          <TextBlock>
            <p>
              Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis (such as monthly or annually).
            </p>
            <h4 className="font-bold text-text-main mt-6 mb-2">Refund Policy</h4>
            <p>
              We offer a 7-day money-back guarantee for all new subscriptions. If you are not satisfied with the Service, please contact our support team within 7 days of your purchase to request a full refund.
            </p>
          </TextBlock>
        </section>

        {/* 8. Disclaimers */}
        <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
           <SectionHeading title="Disclaimer of Liability" />
           <TextBlock className="mb-0">
             <p className="uppercase text-xs font-bold text-text-muted mb-2 tracking-wider">Please Read Carefully</p>
             <p>
               The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Company makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content, or materials included therein. You expressly agree that your use of these services, their content, and any services or items obtained from us is at your sole risk.
             </p>
           </TextBlock>
        </section>

        {/* 9. Termination */}
        <section>
          <SectionHeading title="Termination" />
          <TextBlock>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </TextBlock>
        </section>

        {/* 10. Governing Law */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Gavel size={24} className="text-primary" />
            <SectionHeading title="Governing Law" className="mb-0" />
          </div>
          <TextBlock>
            <p>
              These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.
            </p>
          </TextBlock>
        </section>

        {/* 11. Changes to Terms */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw size={24} className="text-primary" />
            <SectionHeading title="Changes to Terms" className="mb-0" />
          </div>
          <TextBlock>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </TextBlock>
        </section>

        {/* 12. Contact */}
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
