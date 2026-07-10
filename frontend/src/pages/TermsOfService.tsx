
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
    <div className="space-y-12 pb-16 bg-gray-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-gray-900 to-indigo-900 border-b border-indigo-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 opacity-20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
            <Scale size={14} className="text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300 tracking-widest uppercase">Terms of Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl mb-6">
            Please read these terms carefully before using our services.
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
              Welcome to <strong className="text-slate-900">ResumeCraft</strong>. By accessing or using our website, resume templates, and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </TextBlock>
        </section>

        {/* User Accounts */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <UserCheck size={24} className="text-indigo-600" />
            <SectionHeading title="User Accounts" className="mb-0" />
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <TextBlock>
              <p className="text-slate-700">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
            </TextBlock>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl my-6">
              <h4 className="flex items-center font-bold text-yellow-800 mb-2">
                <AlertTriangle size={18} className="mr-2" />
                Security Responsibility
              </h4>
              <p className="text-yellow-700 text-sm leading-relaxed">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third parties.
              </p>
            </div>
          </div>
        </section>

        {/* Acceptable Use */}
        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <SectionHeading title="Acceptable Use" />
          <TextBlock className="mt-6">
            <p className="text-slate-700">
              You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-700">
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam", or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service.</li>
            </ul>
          </TextBlock>
        </section>

        {/* Content Ownership */}
        <section>
          <SectionHeading title="Content Ownership" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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

        {/* Payment & Refunds */}
        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard size={24} className="text-indigo-600" />
            <SectionHeading title="Payment & Refunds" className="mb-0" />
          </div>
          <TextBlock>
            <p className="text-slate-700">
              Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis (such as monthly or annually).
            </p>
            <h4 className="font-bold text-slate-900 mt-6 mb-2">Refund Policy</h4>
            <p className="text-slate-700">
              We offer a 7-day money-back guarantee for all new subscriptions. If you are not satisfied with the Service, please contact our support team within 7 days of your purchase to request a full refund.
            </p>
          </TextBlock>
        </section>

        {/* Disclaimer of Liability */}
        <section className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-2xl p-8 border border-indigo-950 text-white">
           <SectionHeading title="Disclaimer of Liability" />
           <TextBlock className="mb-0 mt-6">
             <p className="uppercase text-xs font-bold text-slate-400 mb-4 tracking-wider">Please Read Carefully</p>
             <p className="text-slate-300">
               The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Company makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content, or materials included therein. You expressly agree that your use of these services, their content, and any services or items obtained from us is at your sole risk.
             </p>
           </TextBlock>
        </section>

        {/* Termination */}
        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <SectionHeading title="Termination" />
          <TextBlock className="mt-6">
            <p className="text-slate-700">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </TextBlock>
        </section>

        {/* Governing Law */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Gavel size={24} className="text-indigo-600" />
            <SectionHeading title="Governing Law" className="mb-0" />
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <TextBlock>
              <p className="text-slate-700">
                These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.
              </p>
            </TextBlock>
          </div>
        </section>

        {/* Changes to Terms */}
        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw size={24} className="text-indigo-600" />
            <SectionHeading title="Changes to Terms" className="mb-0" />
          </div>
          <TextBlock>
            <p className="text-slate-700">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </TextBlock>
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
