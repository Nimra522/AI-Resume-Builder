
import React from 'react';
import { BLOG_CATEGORIES } from '../../data/blogs';

interface BlogCategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const BlogCategoryFilter: React.FC<BlogCategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {BLOG_CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`
            px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${selectedCategory === category
              ? 'bg-primary text-white shadow-md transform scale-105'
              : 'bg-white text-text-muted hover:bg-gray-100 border border-gray-200'}
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
