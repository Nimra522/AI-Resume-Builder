
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { NavItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { UserMenu } from './UserMenu';
import LogoImage from '../../assets/Logo.png';

// --- Simple Hash Router Implementation ---

interface RouterContextType {
  pathname: string;
  search: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  pathname: '/',
  search: '',
  navigate: () => {},
});

export const HashRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getPath = () => window.location.hash.slice(1).split('?')[0] || '/';
  const getSearch = () => {
    const parts = window.location.hash.slice(1).split('?');
    return parts.length > 1 ? `?${parts[1]}` : '';
  };

  const [pathname, setPathname] = useState(getPath());
  const [search, setSearch] = useState(getSearch());

  useEffect(() => {
    const handleHashChange = () => {
      setPathname(getPath());
      setSearch(getSearch());
    };

    if (!window.location.hash) {
      window.location.hash = '#/';
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return (
    <RouterContext.Provider value={{ pathname, search, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useLocation = () => useContext(RouterContext);

export const Link: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ to, children, className, onClick }) => {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        if (onClick) onClick();
      }}
    >
      {children}
    </a>
  );
};

// --- Navbar Component ---

const NAV_ITEMS: NavItem[] = [
  { label: 'Home',      path: '/' },
  { label: 'Templates', path: '/templates' },
  { label: 'Examples',  path: '/examples' },
  { label: 'About us',  path: '/about' },
];

const AUTH_ITEMS: NavItem[] = [
  { label: 'Log In',  path: '/login',  isButton: true, variant: 'secondary' },
  { label: 'Sign Up', path: '/signup', isButton: true, variant: 'primary' },
];

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname, navigate } = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
              <img
                src={LogoImage}
                alt="ResumeCraft logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Resume<span className="text-primary">Craft</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/8 font-semibold'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.icon && <item.icon size={16} />}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons / Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <div className="h-6 w-px bg-gray-200"></div>
                <UserMenu variant="navbar" />
              </div>
            ) : (
              AUTH_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    item.variant === 'primary'
                      ? 'bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {item.label}
                </Link>
              ))
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 overflow-hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon size={18} />}
                  {item.label}
                </div>
              </Link>
            ))}

            <div className="border-t border-gray-100 my-2 pt-2">
              {isAuthenticated && user ? (
                <>
                  <div className="px-3 py-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                      <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); navigate('/login'); }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut size={18} /> Log Out
                    </div>
                  </button>
                </>
              ) : (
                AUTH_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-center px-4 py-2 mt-2 rounded-lg text-base font-semibold ${
                      item.variant === 'primary'
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-gray-50 text-gray-900 border border-gray-200'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
