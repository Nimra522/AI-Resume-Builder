import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  imageSeed: string; // Used for Dicebear avatar generation
  delay?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({ name, role, bio, imageSeed, delay = '0s' }) => {
  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="h-24 bg-gradient-to-r from-primary-light to-accent opacity-80"></div>
      <div className="px-6 pb-6 relative">
        <div className="-mt-12 mb-4">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${imageSeed}`} 
            alt={name} 
            className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-sm"
          />
        </div>
        <h3 className="text-lg font-bold text-text-main">{name}</h3>
        <p className="text-primary text-sm font-medium mb-3">{role}</p>
        <p className="text-text-muted text-sm mb-4 leading-relaxed">{bio}</p>
        
        <div className="flex space-x-3 text-text-muted">
          <a href="#" className="hover:text-primary transition-colors"><Twitter size={18} /></a>
          <a href="#" className="hover:text-primary transition-colors"><Linkedin size={18} /></a>
          <a href="#" className="hover:text-primary transition-colors"><Github size={18} /></a>
        </div>
      </div>
    </div>
  );
};