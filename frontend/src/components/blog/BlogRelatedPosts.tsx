
import React from 'react';
import { BlogPost } from '../../types';
import { BlogCard } from './BlogCard';

interface BlogRelatedPostsProps {
  currentPostId: string;
  category: string;
  allPosts: BlogPost[];
}

export const BlogRelatedPosts: React.FC<BlogRelatedPostsProps> = ({ currentPostId, category, allPosts }) => {
  // Find posts with same category, excluding current, take 3
  const related = allPosts
    .filter(p => p.category === category && p.id !== currentPostId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="border-t border-gray-200 pt-12 mt-12">
      <h2 className="text-2xl font-bold text-text-main mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
