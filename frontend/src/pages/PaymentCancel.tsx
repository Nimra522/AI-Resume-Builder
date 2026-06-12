import React, { useEffect } from 'react';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useLocation } from '../components/layout/Navbar';

export const PaymentCancel: React.FC = () => {
  const { navigate } = useLocation();

  useEffect(() => {
    console.log('PaymentCancel page loaded');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges have been made to your account.
          You can try again or explore our free features.
        </p>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <p className="text-orange-800 font-medium">
            You're still on the Free plan
          </p>
        </div>
        
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate('/pricing')}
            icon={<ArrowLeft size={20} />}
          >
            Try Again
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};