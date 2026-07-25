
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import LogoImage from '../assets/Logo.png';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Link, useLocation } from '../components/layout/Navbar';
import { SuccessMessage } from '../components/ui/SuccessMessage';
import { useAuth } from '../context/AuthContext';
import { googleAuthUrl } from '../utils/api';

export const Signup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { navigate } = useLocation();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only set error if there isn't already an error from the input validation
    if (!error) {
      setError('');
    }

    // Name validation
    // We'll implement this validation here, but ideally should import from a shared validation utility
    const validateName = (name: string) => {
      if (!name || typeof name !== 'string') {
        return { isValid: false, errorMessage: 'Name is required' };
      }

      const trimmedName = name.trim();

      if (trimmedName.length < 2 || trimmedName.length > 50) {
        return {
          isValid: false,
          errorMessage: 'Name must be between 2 and 50 characters'
        };
      }

      const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

      if (!nameRegex.test(trimmedName)) {
       return {
         isValid: false,
         errorMessage:
           'Name must contain only letters and spaces, and cannot start or end with a space'
        };
      }
      return { isValid: true, errorMessage: null };
    };

    
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      if (!error) {  // Only set error if input validation didn't already set one
        setError(nameValidation.errorMessage ?? '');
      }
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup(formData.name, formData.email, formData.password);

      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Real redirection to backend OAuth endpoint
    window.location.href = googleAuthUrl();
  };

  const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  if (isSuccess) {
    // Check if there's a stored template redirect after signup
    const storedTemplateId = localStorage.getItem('post_login_redirect_template');
    const redirectPath = storedTemplateId ? `/templates?id=${storedTemplateId}` : '/dashboard';
    
    // If there is a stored template ID, we will clear it
    if (storedTemplateId) {
      localStorage.removeItem('post_login_redirect_template');
    }

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-200/25 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/25 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-10 relative z-10 animate-fade-in text-center">
          <div className="flex flex-col items-center">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <img
                src={LogoImage}
                alt="ResumeCraft logo"
                className="h-10 w-auto object-contain transform group-hover:scale-105 transition-all duration-300"
              />
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Resume<span className="text-primary">Craft</span>
              </span>
            </Link>
            
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Welcome!</h2>
            <p className="text-sm text-gray-500 mb-6">Account created successfully</p>
            
            <div className="w-full">
              <SuccessMessage 
                title="Account Created"
                message="Your account has been created successfully. You are now being redirected."
                autoRedirectPath={redirectPath}
                navigate={navigate}
                buttonText="Go"
                onButtonClick={() => navigate(redirectPath)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-100/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px] relative z-10 animate-fade-in">
        
        {/* Left Side: Brand Visual (only on desktop/tablet) */}
        <div className="hidden md:flex md:col-span-4 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-8 flex-col justify-between relative text-white border-r border-gray-100/10 overflow-hidden">
          {/* Background decoration blur */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl transform translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl transform -translate-x-12 translate-y-12"></div>

          {/* Logo */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <img src={LogoImage} alt="ResumeCraft logo" className="h-10 w-auto object-contain" />
              <span className="font-bold text-xl text-white tracking-tight">
                Resume<span className="text-indigo-400">Craft</span>
              </span>
            </Link>
          </div>

          {/* Marketing Copy & Features */}
          <div className="relative z-10 my-auto space-y-8 pr-2">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-xs font-semibold text-indigo-300">
                <Sparkles size={12} className="animate-pulse" />
                AI Powered
              </span>
              <h3 className="text-2xl font-bold leading-tight">Create a Job-Winning Resume in Minutes</h3>
            </div>
            
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
                <span>Smart AI-powered content and tailored bullet suggestions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
                <span>10+ modern, clean, and ATS-friendly templates.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
                <span>Fast PDF exports with high-fidelity formatting.</span>
              </li>
            </ul>
          </div>

          {/* Left Side Footer */}
          <div className="relative z-10 border-t border-white/10 pt-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              Join thousands of professionals securing interviews at top companies worldwide.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="col-span-1 md:col-span-8 p-8 sm:p-10 md:p-12 flex flex-col justify-center bg-white">
          <div className="w-full max-w-xl mx-auto space-y-6">
            
            {/* Header */}
            <div>
              {/* Logo visible only on mobile */}
              <div className="md:hidden flex items-center gap-2 mb-6">
                <Link to="/" className="inline-flex items-center gap-2">
                  <img src={LogoImage} alt="ResumeCraft logo" className="h-8 w-auto object-contain" />
                  <span className="text-lg font-bold tracking-tight text-gray-900">
                    Resume<span className="text-primary">Craft</span>
                  </span>
                </Link>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Create Your Account
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Get started with your AI Resume Builder for free
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 animate-shake">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* 2x2 Grid for Desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  icon={User}
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, name: value });
                    const nameRegex = /^[A-Za-z][A-Za-z\s]{0,48}[A-Za-z]$|^[A-Za-z]+$/;
                    const trimmedValue = value.trim();
                    if (value && !nameRegex.test(trimmedValue)) {
                      if (!/^[A-Za-z ]+$/.test(value)) {
                        setError('Name must contain only letters and spaces, and cannot start or end with a space');
                      } else if (trimmedValue.length < 2 || trimmedValue.length > 50) {
                        setError('Name must be between 2 and 50 characters');
                      } else if (/^\s|\s$/.test(value)) {
                        setError('Name must contain only letters and spaces, and cannot start or end with a space');
                      }
                    } else if (error && (nameRegex.test(trimmedValue) || !value)) {
                      setError('');
                    }
                  }}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  icon={Mail}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Password"
                  type="password"
                  placeholder="At least 8 characters"
                  icon={Lock}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Repeat your password"
                  icon={Lock}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" fullWidth isLoading={isLoading} className="mt-4 py-3">
                Create Account <ArrowRight size={18} className="ml-2" />
              </Button>
            </form>

            {/* Separator / Alternative signup */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6">
                <Button type="button" variant="google" fullWidth icon={<GoogleIcon />} onClick={handleGoogleSignup}>
                  Sign up with Google
                </Button>
              </div>
            </div>

            {/* Footer Link */}
            <div className="mt-8 border-t border-gray-100 pt-6 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-primary hover:text-primary-dark transition-colors">
                  Login
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
