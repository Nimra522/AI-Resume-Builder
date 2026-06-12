
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Search, LifeBuoy } from 'lucide-react';
import { SUPPORT_CATEGORIES, SUPPORT_FAQS } from '../data/supportData';
import { CategoryCard } from '../components/support/CategoryCard';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { ContactSupport } from '../components/support/ContactSupport';

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
        
        {/* 1. Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl text-primary mb-6 shadow-sm border border-indigo-50">
            <LifeBuoy size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
            Help & Support
          </h1>
          <p className="text-lg text-text-muted mb-8">
            Need assistance with your resume, subscription, or account? We're here to help.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              className="block w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* 2. Categories Section */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-xl font-bold text-text-main mb-6 px-1">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                isActive={selectedCategory === category.id}
              />
            ))}
          </div>
        </section>

        {/* 3. FAQ Section */}
        <section id="faq-section" className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-xl font-bold text-text-main">
              {selectedCategory 
                ? `${SUPPORT_CATEGORIES.find(c => c.id === selectedCategory)?.title} FAQs`
                : 'Frequently Asked Questions'
              }
            </h2>
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-primary hover:underline font-medium"
              >
                View All
              </button>
            )}
          </div>
          
          <FAQAccordion faqs={filteredFAQs} />
        </section>

        {/* 4. Contact Support Section */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <ContactSupport />
        </section>

      </div>
    </DashboardLayout>
  );
};
