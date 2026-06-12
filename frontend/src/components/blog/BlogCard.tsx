
import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../../types';
import { Link } from '../layout/Navbar';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
          {post.category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{post.publishedAt}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {post.description}
        </p>

        <Link 
          to={`/blog/${post.id}`} 
          className="inline-flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform"
        >
          Read More <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};
