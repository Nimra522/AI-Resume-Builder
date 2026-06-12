import React, { useState } from 'react';
import { FAQ_EXAMPLES, getFaqsByField } from '../../data/faqExamples';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQExamplesProps {
  field: string;
  currentValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const FAQExamples: React.FC<FAQExamplesProps> = ({ 
  field, 
  currentValue, 
  onValueChange, 
  placeholder = "Select an example..." 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const faqs = getFaqsByField(field);

  if (faqs.length === 0) {
    return null;
  }

  const handleSelect = (content: string) => {
    onValueChange(content);
    setIsOpen(false);
  };

  return (
    <div className="relative mt-1 z-40">
      <div className="flex items-center gap-2 mt-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 text-xs text-primary font-medium hover:underline"
        >
          <Sparkles size={12} />
          {isOpen ? 'Hide Examples' : 'Show Examples'}
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {currentValue && (
          <button
            type="button"
            onClick={() => onValueChange('')}
            className="text-xs text-gray-500 hover:text-red-500 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-[9999] mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600">
            {faqs.length} {field.replace('-', ' ')} examples
          </div>
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleSelect(faq.content)}
            >
              <div className="text-xs font-medium text-primary mb-1">{faq.title}</div>
              <div className="text-xs text-gray-600">
                {faq.industry && (
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-2">
                    {faq.industry}
                  </span>
                )}
                {faq.content.length > 100 ? `${faq.content.substring(0, 100)}...` : faq.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};