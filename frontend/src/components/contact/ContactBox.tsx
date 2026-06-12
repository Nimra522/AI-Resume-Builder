
import React from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { Link } from '../layout/Navbar';

interface ContactBoxProps {
  email: string;
  address: string;
  supportLink: string;
}

export const ContactBox: React.FC<ContactBoxProps> = ({ email, address, supportLink }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border border-indigo-100 shadow-sm">
      <h3 className="text-xl font-bold text-text-main mb-6">Have questions about your data?</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-text-main">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-gray-100">
            <Mail size={16} />
          </div>
          <a href={`mailto:${email}`} className="hover:text-primary transition-colors font-medium">
            {email}
          </a>
        </div>

        <div className="flex items-center gap-3 text-text-main">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-gray-100">
            <MapPin size={16} />
          </div>
          <span className="text-text-muted">{address}</span>
        </div>

        <div className="flex items-center gap-3 text-text-main pt-2">
          <Link 
            to={supportLink} 
            className="inline-flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-primary hover:text-primary transition-colors shadow-sm"
          >
            Visit Help Center <ExternalLink size={14} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};
