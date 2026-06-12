
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const BlogPagination: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-16">
      <button className="p-2 rounded-lg border border-gray-200 text-text-muted hover:bg-gray-50 disabled:opacity-50" disabled>
        <ChevronLeft size={20} />
      </button>
      
      <button className="w-10 h-10 rounded-lg bg-primary text-white font-medium flex items-center justify-center shadow-md">
        1
      </button>
      <button className="w-10 h-10 rounded-lg border border-gray-200 text-text-muted hover:bg-gray-50 font-medium flex items-center justify-center">
        2
      </button>
      <button className="w-10 h-10 rounded-lg border border-gray-200 text-text-muted hover:bg-gray-50 font-medium flex items-center justify-center">
        3
      </button>
      
      <button className="p-2 rounded-lg border border-gray-200 text-text-muted hover:bg-gray-50">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
