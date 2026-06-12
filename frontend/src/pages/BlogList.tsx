
import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogs';
import { BlogCard } from '../components/blog/BlogCard';
import { BlogSearchBar } from '../components/blog/BlogSearchBar';
import { BlogCategoryFilter } from '../components/blog/BlogCategoryFilter';
import { BlogPagination } from '../components/blog/BlogPagination';
import { FileText } from 'lucide-react';

export const BlogList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter Logic
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-12 animate-fade-in">
      {/* 1. Hero Section */}
      <section className="relative py-16 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center justify-center p-1.5 bg-primary rounded-lg text-white mb-6">
          <FileText size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4 tracking-tight">
          Our Blog
        </h1>
        <p className="text-xl text-text-muted mb-8">
          Learn tips & insights to build a stronger career.
        </p>

        {/* 2. Search Bar */}
        <BlogSearchBar value={searchTerm} onChange={setSearchTerm} />
      </section>

      {/* 3. Category Filter */}
      <section className="px-4">
        <BlogCategoryFilter 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
      </section>

      {/* 4. Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <p className="text-lg text-text-muted">No articles found matching your criteria.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
              className="mt-4 text-primary font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* 5. Pagination */}
        {filteredPosts.length > 0 && <BlogPagination />}
      </section>
    </div>
  );
};
