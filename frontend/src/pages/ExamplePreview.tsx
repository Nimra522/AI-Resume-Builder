
import React, { useEffect } from 'react';
import { ArrowLeft, Edit, Download } from 'lucide-react';
import { useLocation } from '../components/layout/Navbar';
import { EXAMPLES } from '../data/examples';
import { LivePreview } from '../components/resume/LivePreview';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

interface ExamplePreviewProps {
  id: string;
}

export const ExamplePreview: React.FC<ExamplePreviewProps> = ({ id }) => {
  const { navigate } = useLocation();
  const { isAuthenticated, openLoginModal } = useAuth();
  const example = EXAMPLES.find(e => e.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!example) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Example Not Found</h2>
        <Button onClick={() => navigate('/examples')}>Back to Examples</Button>
      </div>
    );
  }

  const handleUseExample = () => {
    if (!isAuthenticated) {
      openLoginModal(`/templates?id=${example.layoutType}&exampleId=${example.id}`);
      return;
    }
    localStorage.setItem('user_resume_data', JSON.stringify(example.data));
    navigate(`/templates?id=${example.layoutType}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20 animate-fade-in">
      {/* Sticky Preview Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/examples')}
            className="flex items-center text-text-muted hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to Examples
          </button>
          
          <div className="hidden md:block text-center">
            <h1 className="text-lg font-bold text-text-main">{example.title}</h1>
            <p className="text-xs text-text-muted">Previewing expert-written content</p>
          </div>

          <div className="flex items-center gap-3">
             <Button variant="outline" size="sm" disabled className="opacity-50 cursor-not-allowed">
               <Edit size={16} className="mr-2" /> View Only
             </Button>
          </div>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="max-w-4xl mx-auto px-4 pt-12">
         <div className="bg-white shadow-2xl rounded-sm overflow-hidden border border-gray-200">
            <LivePreview data={example.data} templateId={example.layoutType} />
         </div>
      </div>

      {/* Bottom Floating CTA (Mobile) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
         <Button fullWidth size="lg" disabled className="shadow-2xl opacity-50 cursor-not-allowed">
            View Only
         </Button>
      </div>
    </div>
  );
};
