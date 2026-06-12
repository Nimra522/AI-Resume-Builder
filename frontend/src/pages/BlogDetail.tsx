
import React, { useEffect } from 'react';
import { Facebook, Twitter, Linkedin, ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import { BlogAuthorBox } from '../components/blog/BlogAuthorBox';
import { BlogRelatedPosts } from '../components/blog/BlogRelatedPosts';
import { Link, useLocation } from '../components/layout/Navbar';

interface BlogDetailProps {
  id: string;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ id }) => {
  const post = BLOG_POSTS.find(p => p.id === id);
  const { navigate } = useLocation();

  // Scroll to top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-text-main mb-4">Article Not Found</h2>
        <Link to="/blog" className="text-primary hover:underline">Return to Blog</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-12">
      {/* Breadcrumb / Back */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-6">
        <Link to="/blog" className="inline-flex items-center text-text-muted hover:text-primary transition-colors text-sm font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to Blog
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <div className="inline-block px-3 py-1 bg-indigo-50 text-primary rounded-full text-xs font-bold mb-4">
            {post.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-text-main leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-gray-100">
             <BlogAuthorBox author={post.author} />
             
             <div className="flex items-center gap-6 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> {post.publishedAt}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} /> {post.readTime}
                </div>
             </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden mb-12 shadow-md">
          <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
        </div>

        {/* Content Body */}
        <div className="prose prose-lg prose-indigo max-w-none text-text-main mb-12">
           {post.content}
        </div>

        {/* Share Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
           <div className="flex items-center gap-2 font-bold text-text-main mb-4 sm:mb-0">
              <Share2 size={20} className="text-primary" />
              <span>Share this article</span>
           </div>
           <div className="flex gap-4">
              <button className="p-2 bg-white rounded-full text-blue-600 shadow-sm hover:shadow-md transition-all"><Facebook size={20} /></button>
              <button className="p-2 bg-white rounded-full text-sky-500 shadow-sm hover:shadow-md transition-all"><Twitter size={20} /></button>
              <button className="p-2 bg-white rounded-full text-blue-700 shadow-sm hover:shadow-md transition-all"><Linkedin size={20} /></button>
           </div>
        </div>

      </article>

      {/* Related Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <BlogRelatedPosts currentPostId={post.id} category={post.category} allPosts={BLOG_POSTS} />
      </div>
    </div>
  );
};
