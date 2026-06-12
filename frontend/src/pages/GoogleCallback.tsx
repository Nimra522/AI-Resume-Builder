
import React, { useEffect } from 'react';
import { useLocation } from '../components/layout/Navbar';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export const GoogleCallback: React.FC = () => {
  const { navigate, search } = useLocation();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    // Use the router's search parameter instead of window.location.search
    const params = new URLSearchParams(search);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      loginWithToken(token).then(() => {
        navigate('/dashboard');
      });
    } else if (error) {
      console.error('Google Auth Failed:', error);
      navigate('/login');
    } else {
      navigate('/login');
    }
  }, [navigate, loginWithToken, search]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-light animate-fade-in">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center max-w-sm w-full text-center">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
          <div className="relative z-10 w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-text-main mb-2">Authenticating</h2>
        <p className="text-text-muted">Synchronizing with Google and preparing your dashboard...</p>
      </div>
    </div>
  );
};
