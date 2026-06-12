
import React, { useEffect } from 'react';
import { FileText, Search } from 'lucide-react';
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
    <div className="pb-12 animate-fade-in">
      {/* 1. Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border border-indigo-100 shadow-sm mb-12">
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-xl text-primary mb-6 shadow-sm border border-gray-100">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4 tracking-tight">
            Resume Examples
          </h1>
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore 8 professionally written resume examples for every career stage. Click "View" to preview each example.
          </p>

          <div className="relative max-w-md mx-auto">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
               <Search size={20} />
             </div>
             <input 
               type="text" 
               placeholder="Search by role or industry..." 
               className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-sm"
             />
          </div>
        </div>
      </section>

      {/* 2. Examples Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
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

      <section className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-text-muted text-sm">
          <a href="#/templates" className="text-primary font-bold hover:underline">Choose Your Template</a>.
        </p>
      </section>
    </div>
  );
};
