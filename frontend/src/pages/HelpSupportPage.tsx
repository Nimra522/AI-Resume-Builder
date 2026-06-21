
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Search, LifeBuoy, MessageCircle, BookOpen, Shield, FileText, ArrowRight } from 'lucide-react';
import { SUPPORT_CATEGORIES, SUPPORT_FAQS } from '../data/supportData';
import { CategoryCard } from '../components/support/CategoryCard';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { ContactSupport } from '../components/support/ContactSupport';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const HelpSupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter FAQs based on search AND category selection
  const filteredFAQs = SUPPORT_FAQS.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? faq.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)] pb-20">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
           <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl text-indigo-600 mb-6 shadow-sm border border-indigo-100">
              <LifeBuoy size={28} />
           </div>
           <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
           <p className="text-lg text-gray-500 leading-relaxed">
             Need assistance with your resume, templates, or account? Find answers to common questions or get in touch with our support team.
           </p>

           {/* Search Bar */}
           <div className="relative max-w-xl mx-auto mt-10">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for answers..."
                className="block w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-14">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl border border-indigo-100 shadow-sm p-7 hover:shadow-md transition-all cursor-pointer">
                 <div className="flex items-start gap-5">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-md">
                       <BookOpen size={22} />
                    </div>
                    <div className="flex-1">
                       <h3 className="text-lg font-bold text-gray-900 mb-2">Help Center</h3>
                       <p className="text-sm text-gray-500 mb-4">Browse our comprehensive guides and tutorials.</p>
                       <button className="text-sm font-semibold text-indigo-600 flex items-center gap-1 hover:text-indigo-800">
                         Read guides <ArrowRight size={14} />
                       </button>
                    </div>
                 </div>
              </div>

              <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl border border-emerald-100 shadow-sm p-7 hover:shadow-md transition-all cursor-pointer">
                 <div className="flex items-start gap-5">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white shadow-md">
                       <MessageCircle size={22} />
                    </div>
                    <div className="flex-1">
                       <h3 className="text-lg font-bold text-gray-900 mb-2">Live Chat</h3>
                       <p className="text-sm text-gray-500 mb-4">Get instant help from our support agents.</p>
                       <button className="text-sm font-semibold text-emerald-600 flex items-center gap-1 hover:text-emerald-800">
                         Start chat <ArrowRight size={14} />
                       </button>
                    </div>
                 </div>
              </div>

              <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl border border-amber-100 shadow-sm p-7 hover:shadow-md transition-all cursor-pointer">
                 <div className="flex items-start gap-5">
                    <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl text-white shadow-md">
                       <Shield size={22} />
                    </div>
                    <div className="flex-1">
                       <h3 className="text-lg font-bold text-gray-900 mb-2">Contact Us</h3>
                       <p className="text-sm text-gray-500 mb-4">Send us a message, we'll reply within 24 hours.</p>
                       <button className="text-sm font-semibold text-amber-600 flex items-center gap-1 hover:text-amber-800">
                         Contact now <ArrowRight size={14} />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Categories Section */}
        <section className="mb-14">
           <h2 className="text-2xl font-bold text-gray-900 mb-7">Browse by Category</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
             {SUPPORT_CATEGORIES.map(category => (
               <CategoryCard 
                 key={category.id}
                 title={category.title}
                 description={category.description}
                 icon={category.icon}
                 onClick={() => {
                   setSelectedCategory(selectedCategory === category.id ? null : category.id);
                   // Scroll to FAQs if selecting
                   if (selectedCategory !== category.id) {
                     const element = document.getElementById('faq-section');
                     element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                   }
                 }}
                 isActive={selectedCategory === category.id}
               />
             ))}
           </div>
        </section>

        {/* FAQ Section */}
        <section id="faq-section" className="mb-14">
           <div className="flex items-center justify-between mb-7">
             <h2 className="text-2xl font-bold text-gray-900">
               {selectedCategory 
                 ? `${SUPPORT_CATEGORIES.find(c => c.id === selectedCategory)?.title} FAQs`
                 : 'Frequently Asked Questions'
               }
             </h2>
             {selectedCategory && (
               <button 
                 onClick={() => setSelectedCategory(null)}
                 className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
               >
                 View All
               </button>
             )}
           </div>
           
           <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
             <FAQAccordion faqs={filteredFAQs} />
           </div>
        </section>

        {/* Contact Support Section */}
        <section>
           <h2 className="text-2xl font-bold text-gray-900 mb-7">Still Need Help?</h2>
           <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl border border-indigo-100 shadow-sm p-8">
             <ContactSupport />
           </div>
        </section>

      </div>
    </DashboardLayout>
  );
};
