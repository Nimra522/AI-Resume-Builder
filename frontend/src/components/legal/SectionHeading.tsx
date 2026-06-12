
import React from 'react';

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-text-main relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
      </h2>
    </div>
  );
};
