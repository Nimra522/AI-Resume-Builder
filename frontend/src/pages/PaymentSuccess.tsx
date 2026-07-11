import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, ArrowRight, Loader } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useLocation } from '../components/layout/Navbar';
import { apiUrl } from '../utils/api';


export const PaymentSuccess: React.FC = () => {
  const { navigate } = useLocation();
  const { user, refreshUserData } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const [pollingCount, setPollingCount] = useState(0);

  useEffect(() => {
    
    const pollForPlanUpdate = async () => {
      console.log('PaymentSuccess page loaded, starting plan update polling...');
      
      const maxPollingAttempts = 30; // 30 seconds max
      const pollingInterval = 1000; // 1 second intervals
      
      // Direct API call to check plan status without relying on React state
      const checkPlanStatus = async () => {
        try {
          const token = localStorage.getItem('resume_ai_token');
          if (!token) return 'Free';
          
          const response = await fetch(apiUrl('/auth/me'), {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            return userData.plan || 'free';
          }
          return 'free';
        } catch (error) {
          console.error('Error checking plan status:', error);
          return 'free';
        }
      };
      
      for (let attempt = 1; attempt <= maxPollingAttempts; attempt++) {
        try {
          console.log(`Polling attempt ${attempt}: Checking plan status...`);
          
          const currentPlan = await checkPlanStatus();
          
          // Check if plan has been updated to pro or premium
          if (currentPlan === 'pro' || currentPlan === 'premium') {
            console.log(`Plan updated to ${currentPlan}, refreshing user data and redirecting...`);
            // Refresh the AuthContext user data to ensure consistency
            await refreshUserData();
            setIsProcessing(false);
            setTimeout(() => {
              navigate('/dashboard');
            }, 1000); // Brief delay to show success message
            return;
          }
          
          console.log(`Plan still ${currentPlan}, waiting...`);
          setPollingCount(attempt);
          
          // Wait before next poll
          await new Promise(resolve => setTimeout(resolve, pollingInterval));
          
        } catch (error) {
          console.error(`Polling error on attempt ${attempt}:`, error);
          // Continue polling even on error
          await new Promise(resolve => setTimeout(resolve, pollingInterval));
        }
      }
      
      // If polling times out, refresh user data anyway and redirect
      console.log('Polling timeout reached, refreshing user data and redirecting to dashboard...');
      await refreshUserData();
      setIsProcessing(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    };

    pollForPlanUpdate();
    
    // Cleanup function
    return () => {
      setIsProcessing(false);
    };
  }, [refreshUserData, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
          
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
          
        {isProcessing ? (
          <>
            <p className="text-gray-600 mb-6">
              Your payment was processed successfully. We're activating your Pro plan now...
            </p>
              
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Loader className="w-5 h-5 text-yellow-600 animate-spin" />
                <p className="text-yellow-800 font-medium">Payment Processing...</p>
              </div>
              <p className="text-yellow-700 text-sm">
                Please wait while we activate your account ({pollingCount}s)
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your account has been upgraded to <strong>Pro</strong> plan.
              You now have access to all premium features.
            </p>
              
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium">
                Welcome to Pro, {user?.name || 'there'}! 🎉
              </p>
            </div>
          </>
        )}
          
        <div className="space-y-3">
          {!isProcessing && (
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => navigate('/dashboard')}
              icon={<ArrowRight size={20} />}
            >
              Go to Dashboard
            </Button>
          )}
            
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => navigate('/pricing')}
          >
            View Plans
          </Button>
        </div>
      </div>
    </div>
  );
};
