
import React, { useState, useEffect, useRef } from 'react';
import { ResumeData } from '../../types';
import { TemplateEditor } from './TemplateEditor';
import { LivePreview } from '../../components/resume/LivePreview';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Save, Eye, EyeOff, Smartphone, Monitor, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuth } from '../../context/AuthContext';
import { TEMPLATES } from '../../data/templates';

interface TemplateManagerProps {
  templateId: string;
  initialData: ResumeData;
  onSave: (data: ResumeData) => void;
  onCancel: () => void;
  isAuthenticated?: boolean;
}

export const TemplateManager: React.FC<TemplateManagerProps> = ({ 
  templateId, 
  initialData, 
  onSave, 
  onCancel,
  isAuthenticated = false
}) => {
  // Local state for the "draft"
  const [formData, setFormData] = useState<ResumeData>(initialData);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { verifyTemplateAccess, openLoginModal } = useAuth();

  // Refs for PDF capture
  const previewRef = useRef<HTMLDivElement>(null);

  // Determine if we are in mobile view based on window width
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSave = () => {
    onSave(formData);
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    const tpl = TEMPLATES.find(t => t.id === templateId);
    const needsAuth = tpl ? tpl.requiresAuth !== false : true;

    if (!isAuthenticated && needsAuth) {
      openLoginModal(`/templates?id=${templateId}`);
      return;
    }

    if (needsAuth) {
      const accessResult = await verifyTemplateAccess(templateId, 'download');
      if (!accessResult.success) {
        if (accessResult.status === 403) {
          alert('Upgrade your plan to download this template.');
        } else if (accessResult.message) {
          alert(accessResult.message);
        }
        return;
      }
    }
    
    setIsDownloading(true);
    
    try {
      // Wait for all content to fully load
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Capture the resume preview exactly as it appears on screen
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        // Critical: Capture exact visible dimensions
        width: previewRef.current.offsetWidth,
        height: previewRef.current.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        // Ensure all fonts and images are loaded
        onclone: (clonedDoc) => {
          // Set PDF mode for templates that need special styling
          clonedDoc.body.setAttribute('data-pdf-mode', 'true');
          
          // Also add class to html element for broader detection
          clonedDoc.documentElement.classList.add('html2canvas');
          
          // Force all images to load
          const images = clonedDoc.getElementsByTagName('img');
          Array.from(images).forEach(img => {
            if (img.src) {
              img.crossOrigin = 'anonymous';
            }
          });
        }
      });
      
      // Create PDF with exact same dimensions as canvas
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      // Add captured image to PDF at 100% size
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      
      // Save the PDF
      pdf.save(`resume-${templateId}-preview.pdf`);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 flex flex-col h-screen w-screen overflow-hidden animate-fade-in">
      {/* Top Bar */}
      <div className={`py-4 min-h-[50px] bg-white border-b border-gray-200 flex items-center justify-between z-30 shadow-sm ${isAuthenticated ? 'px-4' : 'px-8 md:px-12'}`}>
        <div className={`flex items-center ${isAuthenticated ? 'gap-4' : 'gap-8'}`}>
          <button 
            onClick={onCancel}
            className="flex items-center text-text-muted hover:text-text-main transition-colors font-medium text-sm"
          >
            <ArrowLeft size={18} className="mr-1" /> Back to Templates
          </button>
          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
          <span className="font-bold text-text-main hidden sm:block">
            Editing: <span className="text-primary capitalize">{templateId} Template</span>
          </span>
        </div>

        <div className={`flex items-center ${isAuthenticated ? 'gap-2' : 'gap-4 md:gap-6'}`}>
          {/* Mobile Preview Toggle */}
          <button 
            className="md:hidden p-2 text-text-muted hover:text-primary transition-colors"
            onClick={() => setIsMobilePreview(!isMobilePreview)}
            title={isMobilePreview ? "Show Editor" : "Show Preview"}
          >
            {isMobilePreview ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          
          <div className="hidden md:flex bg-gray-100 rounded-lg p-1 mr-2">
            <button className="p-1.5 rounded bg-white shadow-sm text-primary">
              <Monitor size={16} />
            </button>
            <button className="p-1.5 rounded text-text-muted hover:text-text-main">
              <Smartphone size={16} />
            </button>
          </div>

          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button 
            onClick={handleDownloadPDF} 
            icon={isDownloading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Download size={16} />}
            disabled={isDownloading}
          >
            {isDownloading ? 'Generating PDF...' : 'Download as PDF'}
          </Button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-grow flex overflow-hidden relative">
        
        {/* Left: Editor Form */}
        <div className={`
          w-full md:w-[450px] lg:w-[500px] h-full flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto custom-scrollbar transition-all duration-300 absolute md:relative z-20
          ${isMobilePreview && isMobileView ? '-translate-x-full' : 'translate-x-0'}
        `}>
          <TemplateEditor 
            data={formData} 
            onChange={setFormData} 
            onBack={onCancel} // Optional, as we have top bar
            onSave={handleSave}
            hideHeader={true} // Hide internal header since we have a global manager header
          />
        </div>

        {/* Right: Live Preview */}
        <div className={`
          flex-grow h-full bg-gray-200 overflow-auto flex items-start justify-center p-4 md:p-8 lg:p-12 transition-all duration-300 absolute md:relative w-full z-10
          ${!isMobilePreview && isMobileView ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
          md:translate-x-0 md:opacity-100
        `}>
           <div 
             ref={previewRef}
             className="bg-white shadow-2xl w-full max-w-[800px] min-h-[1100px] origin-top transform transition-transform duration-300 scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.85] xl:scale-100"
           >
             <LivePreview data={formData} templateId={templateId} />
           </div>
        </div>

      </div>
    </div>
  );
};
