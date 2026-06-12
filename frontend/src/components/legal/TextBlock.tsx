
import React from 'react';

interface TextBlockProps {
  children: React.ReactNode;
  className?: string;
}

export const TextBlock: React.FC<TextBlockProps> = ({ children, className = '' }) => {
  return (
    <div className={`prose prose-lg text-text-muted leading-relaxed max-w-none mb-8 ${className}`}>
      {children}
    </div>
  );
};
