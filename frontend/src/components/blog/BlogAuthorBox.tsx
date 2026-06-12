
import React from 'react';
import { BlogPost } from '../../types';

interface BlogAuthorBoxProps {
  author: BlogPost['author'];
}

export const BlogAuthorBox: React.FC<BlogAuthorBoxProps> = ({ author }) => {
  return (
    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
      <img 
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author.avatarSeed}`} 
        alt={author.name}
        className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
      />
      <div>
        <p className="text-sm font-bold text-text-main">{author.name}</p>
        <p className="text-xs text-primary font-medium">{author.role}</p>
      </div>
    </div>
  );
};
