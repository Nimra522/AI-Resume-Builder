
import React from 'react';
import { Mail, MessageCircle, Ticket } from 'lucide-react';
import { Button } from '../ui/Button';

interface SupportOptionsProps {
  onOpenTicket: () => void;
}

export const SupportOptions: React.FC<SupportOptionsProps> = ({ onOpenTicket }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Email */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <Mail size={24} />
        </div>
        <h3 className="font-bold text-lg text-text-main mb-2">Email Support</h3>
        <p className="text-sm text-text-muted mb-6">
          Send us an email and we’ll get back to you within 24 hours.
        </p>
        <Button variant="outline" fullWidth onClick={() => window.location.href = 'mailto:support@resumebuilder.ai'}>
          Send Email
        </Button>
      </div>

      {/* Live Chat */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
          <MessageCircle size={24} />
        </div>
        <h3 className="font-bold text-lg text-text-main mb-2">Live Chat</h3>
        <p className="text-sm text-text-muted mb-6">
          Chat with our support team in real-time. Available 9am - 5pm EST.
        </p>
        <Button variant="outline" fullWidth onClick={() => alert("Live chat connecting...")}>
          Start Chat
        </Button>
      </div>

      {/* Ticket */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
          <Ticket size={24} />
        </div>
        <h3 className="font-bold text-lg text-text-main mb-2">Submit Ticket</h3>
        <p className="text-sm text-text-muted mb-6">
          For complex issues, submit a ticket to track your request.
        </p>
        <Button variant="primary" fullWidth onClick={onOpenTicket}>
          Create Ticket
        </Button>
      </div>
    </div>
  );
};
