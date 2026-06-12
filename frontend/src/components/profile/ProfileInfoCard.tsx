
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoItem {
  label: string;
  value: string | number | React.ReactNode;
}

interface ProfileInfoCardProps {
  title: string;
  icon: LucideIcon;
  items: InfoItem[];
  delay?: string;
}

export const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ title, icon: Icon, items, delay = '0s' }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
          <Icon size={18} />
        </div>
        <h3 className="font-bold text-text-main">{title}</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-50 last:border-0 last:pb-0 first:pt-0">
              <span className="text-sm font-medium text-text-muted mb-1 sm:mb-0">{item.label}</span>
              <span className="text-sm font-semibold text-text-main text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
