
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../layout/Navbar';
import { X, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login, signup, loginRedirectPath } = useAuth();
  const { navigate } = useLocation();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const result = mode === 'login' ? await login(formData.email, formData.password) : await signup(formData.name, formData.email, formData.password);
    if (result.success) {
      setIsSuccess(true);
      
      // Check if there's a stored template redirect after login
      const storedTemplateId = localStorage.getItem('post_login_redirect_template');
      
      setTimeout(() => {
        closeLoginModal();
        
        if (storedTemplateId) {
          // Redirect to the specific template
          navigate(`/templates?id=${storedTemplateId}`);
          localStorage.removeItem('post_login_redirect_template');
        } else {
          // Use the original redirect path
          navigate(loginRedirectPath);
        }
        
        setIsSuccess(false);
      }, 1500);
    } else { 
      setError(result.message); 
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/api/auth/google';
  };

  const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeLoginModal} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div><h2 className="text-xl font-bold text-text-main">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2><p className="text-xs text-text-muted mt-1">Please login to continue building.</p></div>
          <button onClick={closeLoginModal} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
        </div>
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8"><div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6"><CheckCircle2 className="h-10 w-10 text-green-600" /></div><h3 className="text-2xl font-bold text-text-main mb-2">Welcome!</h3><p className="text-text-muted">Redirecting you...</p></div>
          ) : (
            <>
              {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 mb-4 animate-shake"><AlertCircle size={16} />{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && <Input label="Full Name" icon={User} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />}
                <Input label="Email Address" type="email" icon={Mail} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                <Input label="Password" type="password" icon={Lock} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
                <Button type="submit" fullWidth isLoading={isLoading}>{mode === 'login' ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} className="ml-2" /></Button>
              </form>
              <div className="mt-6"><div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div></div>
              <div className="mt-6"><Button type="button" variant="google" fullWidth icon={<GoogleIcon />} onClick={handleGoogleLogin}>Google</Button></div></div>
            </>
          )}
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-sm">
          <p className="text-text-muted">{mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }} className="font-bold text-primary hover:underline">{mode === 'login' ? 'Sign up' : 'Log in'}</button></p>
        </div>
      </div>
    </div>
  );
};
