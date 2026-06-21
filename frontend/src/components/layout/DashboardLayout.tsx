
import React, { useState, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Link, useLocation } from './Navbar';
import { 
  LayoutDashboard, 
  FileText, 
  LayoutTemplate, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X,
  Bell
} from 'lucide-react';
import LogoImage from '../../assets/Logo.png';
import { NavItem } from '../../types';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { NotificationDropdown } from './NotificationDropdown';
import { UserMenu } from './UserMenu';
import FloatingChatButton from '../ui/FloatingChatButton';

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
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-md"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 transform transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? 'w-20' : 'w-60'}
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:sticky md:top-0 md:translate-x-0 md:h-screen flex flex-col shadow-2xl
        `}
      >
        <div className="h-16 flex items-center px-4 border-b border-slate-700/30">
          <Link to="/" className="flex items-center gap-3 flex-1">
            <img
              src={LogoImage}
              alt="ResumeCraft logo"
              className="h-8 w-auto object-contain flex-shrink-0"
            />
            {!isSidebarCollapsed && (
              <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
                Resume<span className="text-indigo-400">Craft</span>
              </span>
            )}
          </Link>
          <button 
            className="ml-2 md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
          <button 
            className="ml-2 hidden md:block text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg p-1.5 transition-all"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            )}
          </button>
        </div>

        <nav className="flex-1 py-8 px-3 space-y-2 overflow-y-auto">
          {DASHBOARD_NAV.map((item) => {
            const isActive = pathname === item.path || (item.path === '/dashboard' && pathname === '/dashboard');
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30' 
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.icon && <item.icon size={20} className="flex-shrink-0" />}
                {!isSidebarCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-5 border-t border-slate-700/30">
           <button 
             onClick={handleLogout}
             className={`flex items-center gap-3 w-full px-4 py-3.5 text-sm font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : ''}`}
           >
             <LogOut size={20} className="flex-shrink-0" />
             {!isSidebarCollapsed && <span className="whitespace-nowrap">Log Out</span>}
           </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 sm:px-8 lg:px-10 sticky top-0 z-30">
          <button 
            className="md:hidden text-slate-600 p-2 -ml-2 hover:bg-slate-100 rounded-xl transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center ml-auto gap-3 sm:gap-5">
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-3 rounded-xl transition-all relative ${isNotificationsOpen ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 shadow-md' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-100'}`}
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-rose-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-white shadow-md">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              {isNotificationsOpen && <NotificationDropdown onClose={() => setIsNotificationsOpen(false)} />}
            </div>
            
            <div className="h-10 w-px bg-slate-200 mx-1"></div>
            
            <UserMenu variant="dashboard" />
          </div>
        </header>

        <main className="flex-1 bg-slate-50 relative">
          {children}
        </main>
      </div>
      <FloatingChatButton />
    </div>
  );
};
