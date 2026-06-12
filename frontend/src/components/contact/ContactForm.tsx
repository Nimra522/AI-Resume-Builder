import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [nameError, setNameError] = useState('');

  // Name validation function - only allows letters and spaces, no leading/trailing spaces
  const validateName = (name: string): boolean => {
    const nameRegex = /^[A-Za-z\s]+$/;
    // Check if it matches the regex, has content after trimming, and doesn't start with space
    return nameRegex.test(name) && name.trim().length > 0 && !name.startsWith(' ');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFormData({...formData, name: newName});
    
    // Validate name in real-time
    if (newName && !validateName(newName)) {
      if (newName.startsWith(' ')) {
        setNameError('Name cannot start with a space');
      } else {
        setNameError('Only valid names are allowed (letters and spaces only)');
      }
    } else {
      setNameError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate name before submission
    if (!validateName(formData.name)) {
      setNameError('Please enter a valid name (letters and spaces only)');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setNameError('');
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 text-center animate-fade-in-up h-full flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-bold text-text-main mb-2">Message Sent!</h3>
        <p className="text-text-muted mb-8 max-w-xs mx-auto leading-relaxed">
          Thank you for reaching out. We will get back to you within 24 hours.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-fade-in space-y-6 h-full">
      <h3 className="text-2xl font-bold text-text-main mb-6">Send us a message</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-text-main">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <User size={18} />
            </div>
            <input
              type="text"
              className={`block w-full rounded-lg border ${
                nameError ? 'border-red-500' : 'border-gray-300'
              } bg-white pl-10 pr-4 py-3 text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm`}
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleNameChange}
            />
          </div>
          {nameError && (
            <div className="flex items-center gap-1.5 mt-1">
              <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{nameError}</p>
            </div>
          )}
        </div>
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="john@example.com" 
          icon={Mail}
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>
      
      <Input 
        label="Subject" 
        placeholder="How can we help?" 
        icon={MessageSquare}
        required
        value={formData.subject}
        onChange={(e) => setFormData({...formData, subject: e.target.value})}
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text-main">Message</label>
        <textarea
          rows={5}
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm resize-none"
          placeholder="Tell us more about your inquiry..."
          required
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        />
      </div>

      <Button 
        type="submit" 
        fullWidth 
        isLoading={isSubmitting} 
        icon={<Send size={18} />}
        disabled={!!nameError || !formData.name.trim()}
      >
        Send Message
      </Button>
    </form>
  );
};