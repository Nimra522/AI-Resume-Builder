
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { AuthCard } from '../components/auth/AuthCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Link, useLocation } from '../components/layout/Navbar';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const { navigate } = useLocation();
  const { login, loginWith2FA } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    let result;
    if (twoFactorRequired) {
      result = await loginWith2FA(formData.email, formData.password, twoFactorToken);
    } else {
      result = await login(formData.email, formData.password);
    }
    
    if (result.success) {
      navigate('/dashboard');
    } else if (result.twoFactorRequired) {
      setTwoFactorRequired(true);
      setError('Please enter your 2FA code');
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    // Real redirection to backend OAuth endpoint
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
    <AuthCard
      title="Welcome Back"
      subtitle="Login to continue building your resume"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkTo="/signup"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 animate-shake">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
        {!twoFactorRequired && (
          <Input label="Email Address" type="email" placeholder="you@example.com" icon={Mail} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        )}
        {!twoFactorRequired && (
          <div className="space-y-1.5">
            <Input label="Password" type="password" placeholder="••••••••" icon={Lock} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            <div className="flex justify-end"><Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary-dark">Forgot password?</Link></div>
          </div>
        )}
        {twoFactorRequired && (
          <div className="space-y-4">
            <div className="text-center">
              <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-2" />
              <h3 className="text-lg font-semibold text-text-main">Two-Factor Authentication</h3>
              <p className="text-sm text-text-muted mt-1">Enter the code sent to your phone</p>
            </div>
            <Input 
              label="OTP Code" 
              type="text" 
              placeholder="123456" 
              icon={ShieldCheck} 
              value={twoFactorToken} 
              onChange={(e) => setTwoFactorToken(e.target.value.replace(/\D/g, '').slice(0, 6))} 
              required 
              autoFocus
              maxLength={6}
            />
            <button 
              type="button" 
              onClick={() => {
                setTwoFactorRequired(false);
                setTwoFactorToken('');
                setError('');
              }}
              className="text-sm text-primary hover:text-primary-dark underline"
            >
              Back to login
            </button>
          </div>
        )}
        <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">Sign In <ArrowRight size={18} className="ml-2" /></Button>
      </form>
      <div className="mt-6">
        <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div></div>
        <div className="mt-6"><Button type="button" variant="google" fullWidth icon={<GoogleIcon />} onClick={handleGoogleLogin}>Sign in with Google</Button></div>
      </div>
    </AuthCard>
  );
};
