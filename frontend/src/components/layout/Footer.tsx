
import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from './Navbar';
import LogoImage from '../../assets/Logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-base-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={LogoImage}
                alt="Resume Craft logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-bold text-text-main tracking-tight">
                Resume Craft
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Build professional resumes in minutes with the power of AI. 
              Modern templates, smart suggestions, and easy export.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/templates" className="text-text-muted hover:text-primary text-sm">Templates</Link></li>
              <li><Link to="/examples" className="text-text-muted hover:text-primary text-sm">Examples</Link></li>
              <li><Link to="/pricing" className="text-text-muted hover:text-primary text-sm">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-text-muted hover:text-primary text-sm">About Us</Link></li>
              <li><Link to="/blog" className="text-text-muted hover:text-primary text-sm">Blog</Link></li>
              <li><Link to="/contact" className="text-text-muted hover:text-primary text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-text-muted hover:text-primary text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-text-muted hover:text-primary text-sm">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-text-muted hover:text-primary text-sm">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} ResumeCraft. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <span className="sr-only">GitHub</span>
              <Github size={20} />
            </a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter size={20} />
            </a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
