
import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from './Button';

interface DeleteConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  title, 
  message, 
  onConfirm, 
  onCancel,
  isDeleting = false
}) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all scale-100">
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-text-main mb-2">{title}</h3>
          <p className="text-sm text-text-muted mb-6">
            {message}
          </p>
          
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
              Cancel
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-500" 
              onClick={onConfirm}
              isLoading={isDeleting}
              icon={!isDeleting ? <Trash2 size={16} /> : undefined}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
