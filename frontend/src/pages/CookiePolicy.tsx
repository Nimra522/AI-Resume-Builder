
import React, { useEffect } from 'react';
import { Cookie, ShieldCheck, BarChart3, Settings, Zap, Globe, Lock } from 'lucide-react';
import { SectionHeading } from '../components/legal/SectionHeading';
import { TextBlock } from '../components/legal/TextBlock';
import { ContactBox } from '../components/contact/ContactBox';
import { CookieCard } from '../components/legal/CookieCard';

export const CookiePolicy: React.FC = () => {
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
            <Cookie size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4 tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-xl text-text-muted mb-6">
            Learn how we use cookies to improve your experience.
          </p>
          <div className="inline-block px-4 py-1.5 bg-gray-50 rounded-full text-sm font-medium text-text-muted border border-gray-200">
            Last updated: {currentDate}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 2. Introduction */}
        <section>
          <TextBlock>
            <p className="text-lg">
              This Cookie Policy explains how ResumeCraft uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            <p className="mt-4">
              <strong>What are cookies?</strong><br/>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
          </TextBlock>
        </section>

        {/* 3. Types of Cookies We Use */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Zap size={24} className="text-primary" />
            <SectionHeading title="Types of Cookies We Use" className="mb-0" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CookieCard 
              title="Essential Cookies"
              description="These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas."
              icon={Lock}
              category="Essential"
              isRequired={true}
            />
            <CookieCard 
              title="Performance Cookies"
              description="These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable."
              icon={BarChart3}
              category="Analytics"
            />
            <CookieCard 
              title="Functional Cookies"
              description="These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are."
              icon={Settings}
              category="Functional"
            />
            <CookieCard 
              title="Advertising Cookies"
              description="These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing."
              icon={Globe}
              category="Marketing"
            />
          </div>
        </section>

        {/* 4. How Users Can Control Cookies */}
        <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={24} className="text-primary" />
            <SectionHeading title="How to Control Cookies" className="mb-0" />
          </div>
          <TextBlock className="mb-0">
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
            </p>
            <p className="mt-4">
              Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of our services or websites you visit.
            </p>
          </TextBlock>
        </section>

        {/* 5. Third-Party Cookies */}
        <section>
           <SectionHeading title="Third-Party Cookies" />
           <TextBlock>
             <p>
               In addition to our own cookies, we may also use various third-party services that utilize cookies to enhance your experience on our resume builder platform.
             </p>
             <ul className="list-disc pl-5 space-y-2 mt-4">
               <li><strong>Google Analytics:</strong> Measures how users interact with our resume templates and website content to improve user experience.</li>
               <li><strong>Stripe:</strong> Uses cookies for secure payment processing and fraud prevention for premium subscriptions.</li>
               <li><strong>Twilio:</strong> May use cookies for SMS notification services and account verification.</li>
             </ul>
           </TextBlock>
        </section>

        {/* 6. Changes to This Cookie Policy */}
        <section>
          <SectionHeading title="Changes to This Policy" />
          <TextBlock>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
          </TextBlock>
        </section>

        {/* 7. Contact Information */}
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
