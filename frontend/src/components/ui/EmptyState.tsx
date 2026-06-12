
import React from 'react';
import { FilePlus } from 'lucide-react';
import { Button } from './Button';
import { Link } from '../layout/Navbar';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  actionText, 
  actionLink 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl border border-dashed border-gray-300">
      <div className="bg-indigo-50 p-4 rounded-full mb-6">
        <FilePlus size={48} className="text-primary/50" />
      </div>
      <h3 className="text-xl font-bold text-text-main mb-2">{title}</h3>
      <p className="text-text-muted max-w-sm mb-8">{description}</p>
      
      <Link to={actionLink}>
        <Button size="lg" icon={<FilePlus size={20} />}>
          {actionText}
        </Button>
      </Link>
    </div>
  );
};
