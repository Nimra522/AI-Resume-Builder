import React, { useState } from 'react';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { AuthCard } from '../components/auth/AuthCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Link, useLocation } from '../components/layout/Navbar';
import { SuccessMessage } from '../components/ui/SuccessMessage';
import { apiUrl } from '../utils/api';

export const ResetPassword: React.FC = () => {
  const { pathname, navigate } = useLocation();
  const token = pathname.split('/')[2] || '';
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(apiUrl('/auth/reset-password'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthCard
        title="Password Reset"
        subtitle="Your password has been updated"
        footerText="Back to"
        footerLinkText="Login"
        footerLinkTo="/login"
      >
        <SuccessMessage
          title="Password Changed!"
          message="Your password has been successfully reset. You can now log in with your new password."
          buttonText="Return to Login"
          onButtonClick={() => navigate('/login')}
        />
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset Your Password"
      subtitle="Enter your new password below"
      footerText="Remember your password?"
      footerLinkText="Login"
      footerLinkTo="/login"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 animate-shake">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <Input
          label="New Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button type="submit" fullWidth isLoading={isLoading}>
          Reset Password <ArrowRight size={18} className="ml-2" />
        </Button>
      </form>
      
      <div className="mt-4 text-center">
         <Link to="/login" className="text-sm font-medium text-text-muted hover:text-text-main flex items-center justify-center gap-1">
            <Lock size={16} /> Back to Login
         </Link>
      </div>
    </AuthCard>
  );
};
