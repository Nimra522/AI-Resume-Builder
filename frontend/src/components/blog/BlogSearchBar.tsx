
import React from 'react';
import { Search } from 'lucide-react';

interface BlogSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const BlogSearchBar: React.FC<BlogSearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Search size={20} />
      </div>
      <input
        type="text"
        placeholder="Search articles..."
        className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
