
import React from 'react';
import { SupportFAQ } from '../../data/supportData';
import { FAQItem } from './FAQItem';

interface FAQAccordionProps {
  faqs: SupportFAQ[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  if (faqs.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted bg-gray-50 rounded-lg border border-dashed border-gray-200">
        No questions found matching your criteria.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100 px-6 py-2">
      {faqs.map(faq => (
        <FAQItem 
          key={faq.id} 
          question={faq.question} 
          answer={faq.answer} 
        />
      ))}
    </div>
  );
};
