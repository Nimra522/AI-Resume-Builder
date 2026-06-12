
import React from 'react';
import { useNotifications, Notification } from '../../context/NotificationContext';
import { Check, BellOff, Clock, Sparkles, FileText, Download, LogIn } from 'lucide-react';

export const NotificationDropdown: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  const getIcon = (type: string, message: string) => {
    if (message.toLowerCase().includes('save')) return <FileText size={14} className="text-blue-500" />;
    if (message.toLowerCase().includes('download')) return <Download size={14} className="text-green-500" />;
    if (message.toLowerCase().includes('welcome')) return <LogIn size={14} className="text-indigo-500" />;
    return <Sparkles size={14} className="text-yellow-500" />;
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-fade-in origin-top-right">
      <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <h3 className="font-bold text-text-main">Notifications</h3>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
        {notifications.length === 0 ? (
          <div className="p-10 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
              <BellOff size={24} />
            </div>
            <p className="text-sm text-text-muted">No new notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {notifications.map((n) => (
              <div 
                key={n.id} 
                onClick={() => markAsRead(n.id)}
                className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${!n.isRead ? 'bg-indigo-50/20' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${!n.isRead ? 'bg-white shadow-sm' : 'bg-gray-50 opacity-50'}`}>
                  {getIcon(n.type, n.message)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-tight ${!n.isRead ? 'font-semibold text-text-main' : 'text-text-muted'}`}>
                    {n.message}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-text-muted">
                    <Clock size={10} />
                    {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {!n.isRead && <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-3 border-t border-gray-50 text-center bg-gray-50/30">
          <button onClick={onClose} className="text-xs font-medium text-text-muted hover:text-text-main transition-colors">
            Close Panel
          </button>
        </div>
      )}
    </div>
  );
};
