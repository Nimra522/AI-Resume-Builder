
import React, { useEffect } from 'react';
import { FileText } from 'lucide-react';
import { EXAMPLES } from '../data/examples';
import { ExampleCard } from '../components/examples/ExampleCard';
import { useLocation } from '../components/layout/Navbar';
import { useAuth } from '../context/AuthContext';
import { Example } from '../types';

export const ExamplesPage: React.FC = () => {
  const { navigate } = useLocation();
  const { isAuthenticated, openLoginModal } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleViewExample = (id: string) => {
    navigate(`/examples/${id}`);
  };

  return (
    <div className="space-y-12 pb-16 bg-gray-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-gray-900 to-indigo-900 border-b border-indigo-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 opacity-20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
            <FileText size={14} className="text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300 tracking-widest uppercase">Resume Examples</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Professional Resume Examples
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed mb-8">
            Explore 8 professionally written resume examples for every career stage. Click "View" to preview each example.
          </p>

        </div>
      </section>

      {/* Examples Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {EXAMPLES.map((example) => (
             <ExampleCard 
                key={example.id} 
                example={example} 
                onView={() => handleViewExample(example.id)}
             />
           ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-slate-600 text-sm">
          <a href="#/templates" className="text-indigo-600 font-bold hover:text-indigo-800 underline">Choose Your Template</a>.
        </p>
      </section>
    </div>
  );
};
