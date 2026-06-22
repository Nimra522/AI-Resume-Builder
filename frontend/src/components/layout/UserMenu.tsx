import React, { useState, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Link, useLocation } from './Navbar';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  LayoutDashboard,
  Settings,
  FileText,
  HelpCircle,
  LogOut,
  ChevronDown,
  Edit3,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export type UserMenuVariant = 'navbar' | 'dashboard';

interface UserMenuProps {
  variant?: UserMenuVariant;
  isEditorPage?: boolean;
}

const MenuLink: React.FC<{
  to: string;
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}> = ({ to, icon: Icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-text-muted hover:text-text-main hover:bg-gray-50 rounded-lg transition-colors group"
  >
    <Icon size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
    {label}
  </Link>
);

const MenuButton: React.FC<{
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}> = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-text-main hover:bg-indigo-50 hover:text-primary rounded-lg transition-colors group"
  >
    <Icon size={16} className="text-gray-400 group-hover:text-primary" />
    {label}
  </button>
);

const planBadgeClass = (plan: string) =>
  plan === 'Premium'
    ? 'bg-indigo-50 text-primary border-indigo-100'
    : plan === 'Pro'
      ? 'bg-purple-50 text-purple-600 border-purple-100'
      : 'bg-gray-50 text-gray-500 border-gray-200';

/**
 * Unified user menu replacing ProfileDropdown and DashboardProfileMenu.
 *
 * Usage:
 * - Navbar: <UserMenu variant="navbar" />
 * - Dashboard: <UserMenu variant="dashboard" />
 */
export const UserMenu: React.FC<UserMenuProps> = ({ variant = 'navbar', isEditorPage = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const { navigate } = useLocation();

  useClickOutside(menuRef, () => setIsOpen(false));

  if (!user) return null;

  const closeAndNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isNavbar = variant === 'navbar';
  const displayPlan = (user.plan || 'free').charAt(0).toUpperCase() + (user.plan || 'free').slice(1);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      {isNavbar ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200 group"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-primary font-bold overflow-hidden border border-indigo-200">
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <ChevronDown
            size={14}
            className={`text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      ) : (
        <div
          className={`flex items-center gap-2 pl-1 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors ${isEditorPage ? 'p-1' : 'p-1.5'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`rounded-full bg-indigo-100 flex items-center justify-center text-primary font-bold overflow-hidden border-2 border-white shadow-sm ${isEditorPage ? 'w-8 h-8' : 'w-9 h-9'}`}>
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          </div>
          {!isEditorPage && (
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-text-main leading-none">{user.name}</p>
              <p className="text-[10px] text-text-muted mt-1 uppercase font-black tracking-widest flex items-center gap-1">
                <ShieldCheck size={10} className="text-primary" /> {displayPlan} Member
              </p>
            </div>
          )}
          <ChevronDown
            size={isEditorPage ? 12 : 14}
            className={`text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isEditorPage ? '' : 'hidden sm:block'}`}
          />
        </div>
      )}

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className={`absolute right-0 max-w-[90vw] ${isEditorPage ? (isNavbar ? 'mt-2 w-64 origin-top-right' : 'mt-3 w-72 origin-top-right') : (isNavbar ? 'bottom-full mb-2 w-64 origin-bottom-right' : 'bottom-full mb-3 w-72 origin-bottom-right')} bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[9999] animate-fade-in`}
        >
          {isNavbar ? (
            <>
              {/* Navbar: Compact header */}
              <div className="px-4 py-3 border-b border-gray-50 mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-text-main truncate">{user.name}</p>
                    <p className="text-xs text-text-muted truncate">{user.email}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${planBadgeClass(displayPlan)}`}
                  >
                    {displayPlan} Plan
                  </span>
                </div>
              </div>
              <div className="px-1 py-1">
                <MenuLink to="/profile" icon={User} label="View Profile" onClick={() => setIsOpen(false)} />
                <MenuLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" onClick={() => setIsOpen(false)} />
                <MenuLink to="/dashboard/resumes" icon={FileText} label="My Resumes" onClick={() => setIsOpen(false)} />
                <MenuLink to="/settings" icon={Settings} label="Settings" onClick={() => setIsOpen(false)} />
                <MenuLink to="/dashboard/support" icon={HelpCircle} label="Help & Support" onClick={() => setIsOpen(false)} />
              </div>
              <div className="px-1 py-1 mt-1 border-t border-gray-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Dashboard: Expanded header with stats */}
              <div className="bg-gray-50/50 p-5 border-b border-gray-50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-main">{user.name}</h3>
                    <p className="text-xs text-text-muted truncate">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-2 rounded-xl border border-gray-100 text-center">
                    <p className="text-[10px] uppercase font-bold text-text-muted mb-0.5">Resumes</p>
                    <p className="text-sm font-black text-primary flex items-center justify-center gap-1">
                      <FileText size={12} /> {user.resumeCount}
                    </p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-gray-100 text-center">
                    <p className="text-[10px] uppercase font-bold text-text-muted mb-0.5">Active Plan</p>
                    <p className="text-sm font-black text-indigo-600">{displayPlan}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <div className="flex items-center gap-2 px-3 py-1.5 mb-2 text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  <Clock size={10} /> Last Login: {user.lastLogin}
                </div>
                <MenuButton icon={User} label="View Profile" onClick={() => closeAndNavigate('/profile')} />
                <MenuButton icon={Settings} label="Account Settings" onClick={() => closeAndNavigate('/settings')} />
              </div>
              <div className="p-2 border-t border-gray-50 bg-gray-50/30">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
