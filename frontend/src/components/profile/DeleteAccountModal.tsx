
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface DeleteAccountModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ 
  onConfirm, 
  onCancel, 
  isDeleting 
}) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-shake">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account Permanently?</h3>
          
          <div className="bg-red-50 rounded-lg p-4 mb-6 text-left">
             <p className="text-sm text-red-800 font-medium mb-1">Warning: This action cannot be undone.</p>
             <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
               <li>All your resumes and data will be lost.</li>
               <li>Your active subscription will be cancelled.</li>
               <li>You will not be able to recover this account.</li>
             </ul>
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
              Cancel, Keep Account
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-500" 
              onClick={onConfirm}
              isLoading={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete Everything'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
