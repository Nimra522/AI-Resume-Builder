
import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { AuthCard } from '../components/auth/AuthCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Link, useLocation } from '../components/layout/Navbar';
import { SuccessMessage } from '../components/ui/SuccessMessage';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { navigate } = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock API simulation
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('resume_ai_users') || '[]');
      const exists = users.some((u: any) => u.email === email);

      if (exists) {
        setIsSuccess(true);
      } else {
        setError('No account found with this email address.');
      }
      setIsLoading(false);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <AuthCard
        title="Check Your Email"
        subtitle="Password reset instructions sent"
        footerText="Back to"
        footerLinkText="Login"
        footerLinkTo="/login"
      >
        <SuccessMessage
          title="Link Sent!"
          message={`We have sent a password reset link to ${email}. Please check your inbox.`}
          buttonText="Return to Login"
          onButtonClick={() => navigate('/login')}
        />
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Enter your email to receive instructions"
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
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" fullWidth isLoading={isLoading}>
          Send Reset Link <ArrowRight size={18} className="ml-2" />
        </Button>
      </form>
      
      <div className="mt-4 text-center">
         <Link to="/login" className="text-sm font-medium text-text-muted hover:text-text-main flex items-center justify-center gap-1">
            <ArrowLeft size={16} /> Back to Login
         </Link>
      </div>
    </AuthCard>
  );
};
