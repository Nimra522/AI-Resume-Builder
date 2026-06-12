import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface SuccessMessageProps {
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  autoRedirectPath?: string;
  navigate?: (path: string) => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title,
  message,
  buttonText,
  onButtonClick,
  autoRedirectPath,
  navigate
}) => {
  
  useEffect(() => {
    if (autoRedirectPath && navigate) {
      const timer = setTimeout(() => {
        navigate(autoRedirectPath);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoRedirectPath, navigate]);

  return (
    <div className="text-center py-8 animate-fade-in-up">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-text-main mb-2">{title}</h3>
      <p className="text-text-muted mb-8">{message}</p>
      
      {buttonText && onButtonClick && (
        <Button onClick={onButtonClick} fullWidth>
          {buttonText}
        </Button>
      )}
      
      {autoRedirectPath && (
        <p className="text-sm text-text-muted mt-4">
          Redirecting in 3 seconds...
        </p>
      )}
    </div>
  );
};