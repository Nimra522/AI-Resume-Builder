
import React, { useState, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Link, useLocation } from './Navbar';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X,
  Bell
} from 'lucide-react';
import { NavItem } from '../../types';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { NotificationDropdown } from './NotificationDropdown';
import { UserMenu } from './UserMenu';

const DASHBOARD_NAV: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'My Resumes', path: '/dashboard/resumes', icon: FileText },
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Help & Support', path: '/dashboard/support', icon: HelpCircle },
];

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { pathname, navigate } = useLocation();
  const { unreadCount } = useNotifications();
  const { user, logout } = useAuth();
  const notificationRef = useRef<HTMLDivElement>(null);
  useClickOutside(notificationRef, () => setIsNotificationsOpen(false));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? 'w-20' : 'w-64'}
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 flex flex-col
        `}
      >
        <div className="h-16 flex items-center px-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 flex-1">
            <div className="bg-primary text-white p-1.5 rounded-lg flex-shrink-0">
              <FileText size={20} />
            </div>
            {!isSidebarCollapsed && (
              <span className="font-bold text-lg text-text-main tracking-tight whitespace-nowrap">ResumeCraft</span>
            )}
          </Link>
          <button 
            className="ml-2 md:hidden text-gray-500"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
          <button 
            className="ml-2 hidden md:block text-gray-500 hover:text-primary transition-colors"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            )}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {DASHBOARD_NAV.map((item) => {
            const isActive = pathname === item.path || (item.path === '/dashboard' && pathname === '/dashboard');
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'bg-indigo-50 text-primary' 
                    : 'text-text-muted hover:bg-gray-50 hover:text-text-main'
                } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.icon && <item.icon size={20} className="flex-shrink-0" />}
                {!isSidebarCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
           <button 
             onClick={handleLogout}
             className={`flex items-center gap-3 w-full px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : ''}`}
           >
             <LogOut size={20} className="flex-shrink-0" />
             {!isSidebarCollapsed && <span className="whitespace-nowrap">Log Out</span>}
           </button>
        </div>
      </aside>



      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button 
            className="md:hidden text-gray-500 p-2 -ml-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center ml-auto gap-2 sm:gap-4">
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2 rounded-full transition-all relative ${isNotificationsOpen ? 'bg-indigo-50 text-primary' : 'text-text-muted hover:text-primary hover:bg-gray-100'}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              {isNotificationsOpen && <NotificationDropdown onClose={() => setIsNotificationsOpen(false)} />}
            </div>
            
            <div className="h-8 w-px bg-gray-200 mx-1"></div>
            
            <UserMenu variant="dashboard" />
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-100 relative custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};
