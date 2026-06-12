
import React, { useState } from 'react';
import { X, Send, Paperclip, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({ name: '', email: '', category: 'General', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-text-main">Submit a Ticket</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-2">Ticket Created!</h3>
              <p className="text-text-muted mb-6">
                We've received your request and will get back to you via email within 24 hours.
              </p>
              <Button onClick={resetForm}>Close</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Name" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
                <Input 
                  label="Email" 
                  type="email"
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-main">Issue Category</label>
                <select 
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-text-main focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>General Inquiry</option>
                  <option>Technical Issue</option>
                  <option>Billing & Payments</option>
                  <option>Feature Request</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-main">Message</label>
                <textarea 
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-text-main focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm resize-none"
                  rows={5}
                  required
                  placeholder="Describe your issue in detail..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button type="button" className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors px-3 py-2 rounded-lg border border-dashed border-gray-300 hover:border-primary hover:bg-indigo-50">
                  <Paperclip size={16} /> Attach File (Optional)
                </button>
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  isLoading={isSubmitting} 
                  icon={<Send size={16} />}
                >
                  Submit Ticket
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
