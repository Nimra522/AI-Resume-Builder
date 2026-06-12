
import React from 'react';
import { FileText, Settings, Zap, LogOut } from 'lucide-react';
import { useLocation } from '../layout/Navbar';

export const QuickActions: React.FC = () => {
  const { navigate } = useLocation();

  const actions = [
    { 
      label: 'My Resumes', 
      icon: FileText, 
      path: '/dashboard/resumes', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      hover: 'hover:bg-blue-100' 
    },
    { 
      label: 'Settings', 
      icon: Settings, 
      path: '/settings', 
      color: 'text-gray-600', 
      bg: 'bg-gray-50',
      hover: 'hover:bg-gray-100' 
    },
    { 
      label: 'Upgrade Plan', 
      icon: Zap, 
      path: '/pricing', 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-50',
      hover: 'hover:bg-yellow-100' 
    },
    { 
      label: 'Log Out', 
      icon: LogOut, 
      path: '/login', 
      color: 'text-red-600', 
      bg: 'bg-red-50',
      hover: 'hover:bg-red-100' 
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="font-bold text-text-main">Quick Actions</h3>
      </div>
      <div className="p-6 grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => {
              if (action.path === '/login') {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_name');
              }
              navigate(action.path);
            }}
            className={`
              flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200
              ${action.bg} ${action.hover}
            `}
          >
            <action.icon size={24} className={`mb-2 ${action.color}`} />
            <span className={`text-sm font-semibold ${action.color}`}>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
