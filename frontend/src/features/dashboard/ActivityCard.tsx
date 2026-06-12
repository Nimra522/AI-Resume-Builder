
import React from 'react';
import { Activity } from '../../data/mockProfile';
import { Activity as ActivityIcon, Edit3, Download, Sparkles, LogIn } from 'lucide-react';

interface ActivityCardProps {
  activities: Activity[];
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activities }) => {
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'edit': return <Edit3 size={16} className="text-blue-500" />;
      case 'download': return <Download size={16} className="text-green-500" />;
      case 'tool': return <Sparkles size={16} className="text-purple-500" />;
      case 'login': return <LogIn size={16} className="text-gray-500" />;
      default: return <ActivityIcon size={16} className="text-gray-500" />;
    }
  };

  const getBgColor = (type: Activity['type']) => {
    switch (type) {
      case 'edit': return 'bg-blue-50';
      case 'download': return 'bg-green-50';
      case 'tool': return 'bg-purple-50';
      case 'login': return 'bg-gray-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
          <ActivityIcon size={18} />
        </div>
        <h3 className="font-bold text-text-main">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative flex gap-4">
              {/* Connector Line */}
              {index !== activities.length - 1 && (
                <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-gray-100"></div>
              )}
              
              <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getBgColor(activity.type)}`}>
                {getIcon(activity.type)}
              </div>
              
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium text-text-main">{activity.description}</p>
                <p className="text-xs text-text-muted mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
