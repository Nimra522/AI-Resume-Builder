
import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from './Navbar';
import LogoImage from '../../assets/Logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={LogoImage}
                alt="Resume Craft logo"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
              <span className="text-lg font-bold text-white tracking-tight">
                Resume<span className="text-primary-light">Craft</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Build professional resumes in minutes with the power of AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/templates" className="text-slate-400 hover:text-white text-sm transition-colors">Templates</Link></li>
              <li><Link to="/examples"  className="text-slate-400 hover:text-white text-sm transition-colors">Examples</Link></li>
              <li><Link to="/pricing"   className="text-slate-400 hover:text-white text-sm transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/about"   className="text-slate-400 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link to="/blog"    className="text-slate-400 hover:text-white text-sm transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms"   className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-slate-400 hover:text-white text-sm transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} ResumeCraft. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              <Github size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
