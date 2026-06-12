
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { AuthCard } from '../components/auth/AuthCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useLocation } from '../components/layout/Navbar';
import { SuccessMessage } from '../components/ui/SuccessMessage';
import { useAuth } from '../context/AuthContext';

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
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
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

  if (isSuccess) {
    return (
      <AuthCard
        title="Welcome!"
        subtitle="Account created successfully"
        footerText=""
        footerLinkText=""
        footerLinkTo=""
      >
        <SuccessMessage 
          title="Account Created"
          message="Your account has been created successfully. You are now being redirected to your dashboard."
          autoRedirectPath="/dashboard"
          navigate={navigate}
          buttonText="Go to Dashboard"
          onButtonClick={() => navigate('/dashboard')}
        />
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create Your Account"
      subtitle="Get started with your AI Resume Builder"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkTo="/login"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 animate-shake">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
        
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          icon={User}
          value={formData.name}
          onChange={(e) => {
            const value = e.target.value;
            
            // Update the form data
            setFormData({ ...formData, name: value });
            
            // Check if the value matches the required format
            const nameRegex = /^[A-Za-z][A-Za-z\s]{0,48}[A-Za-z]$|^[A-Za-z]+$/;
            const trimmedValue = value.trim();
            
            // Validate the name format and update error state
            if (value && !nameRegex.test(trimmedValue)) {
              if (!/^[A-Za-z ]+$/.test(value)) {
                setError('Name must contain only letters and spaces, and cannot start or end with a space');
              } else if (trimmedValue.length < 2 || trimmedValue.length > 50) {
                setError('Name must be between 2 and 50 characters');
              } else if (/^\s|\s$/.test(value)) {
                setError('Name must contain only letters and spaces, and cannot start or end with a space');
              }
            } else if (error && (nameRegex.test(trimmedValue) || !value)) {
              // Clear the error if the name becomes valid (or is empty)
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

        <Input
          label="Password"
          type="password"
          placeholder="At least 6 characters"
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

        <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">
          Create Account <ArrowRight size={18} className="ml-2" />
        </Button>
      </form>

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
    </AuthCard>
  );
};
