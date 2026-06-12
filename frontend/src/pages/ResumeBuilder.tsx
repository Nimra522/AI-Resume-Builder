
import React, { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ResumeForm } from '../components/resume/ResumeForm';
import { LivePreview } from '../components/resume/LivePreview';
import { INITIAL_RESUME_DATA, TEMPLATES } from '../data/templates';
import { ResumeData, SavedResume } from '../types';
import { Download, Eye, Palette, Save, Loader2, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const ResumeBuilder: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [selectedTemplateId, setSelectedTemplateId] = useState('modern');
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const [pendingTemplateId, setPendingTemplateId] = useState<string | null>(null);
  
  const { addNotification } = useNotifications();
  const { user, isAuthenticated, openLoginModal, updateResumeCount, verifyTemplateAccess } = useAuth();
  const previewRef = useRef<HTMLDivElement>(null);

  // Load from local storage if available on mount
  useEffect(() => {
    console.log('ResumeBuilder mounting, loading saved data...');
    const savedData = localStorage.getItem('resume_builder_data');
    const savedTitle = localStorage.getItem('resume_builder_title');
    const savedTemplate = localStorage.getItem('resume_builder_template_id');
    
    console.log('Found saved data:', { savedData: !!savedData, savedTitle: !!savedTitle, savedTemplate: !!savedTemplate });
    
    // Check for template parameter in URL for new template selection
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const templateParam = urlParams.get('template');
    
    if (templateParam) {
      console.log('Template parameter found in URL:', templateParam);
      setPendingTemplateId(templateParam);
      const newHash = window.location.hash.split('?')[0];
      window.location.hash = newHash;
    }
    
    // Check if the saved data contains old sample values (like the original Alex Jordan data)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log('Parsed data:', parsedData.personalInfo);
        
        // Check if this is old sample data by looking for specific old values
        if (parsedData.personalInfo.fullName === 'Alex Jordan' || 
            parsedData.personalInfo.email === 'alex.jordan@example.com' ||
            parsedData.personalInfo.summary?.includes('Creative and detail-oriented Product Designer')) {
          // This is old sample data, clear it and use initial empty data
          console.log('Clearing old sample data');
          localStorage.removeItem('resume_builder_data');
          localStorage.removeItem('resume_builder_title');
          localStorage.removeItem('resume_builder_template_id');
        } else {
          // This is actual user data, load it
          console.log('Loading actual user data');
          // Ensure backward compatibility by adding missing countryCode field
          const normalizedData = {
            ...parsedData,
            personalInfo: {
              ...parsedData.personalInfo,
              countryCode: parsedData.personalInfo.countryCode || '+1'
            }
          };
          setResumeData(normalizedData);
          if (savedTitle) setResumeTitle(savedTitle);
          // Only set template from localStorage if no template parameter was provided
          if (savedTemplate && !templateParam) setSelectedTemplateId(savedTemplate);
        }
      } catch (e) {
        console.error("Failed to load resume data", e);
      }
    } else if (!templateParam) {
      // If no saved data and no template parameter, use default template
      setSelectedTemplateId('modern');
    }
    
    // Cleanup function
    return () => {
      console.log('ResumeBuilder unmounting');
    };
  }, []);

  useEffect(() => {
    if (!pendingTemplateId) return;

    const template = TEMPLATES.find(t => t.id === pendingTemplateId);
    const needsAuth = template ? template.requiresAuth !== false : true;

    if (!isAuthenticated && needsAuth) {
      openLoginModal(`/dashboard?template=${pendingTemplateId}`);
      return;
    }

    if (needsAuth) {
      verifyTemplateAccess(pendingTemplateId, 'editor').then(result => {
        if (result.success) {
          setSelectedTemplateId(pendingTemplateId);
        } else if (result.status === 403) {
          addNotification('Upgrade your plan to use this template.', 'warning');
        }
      }).finally(() => {
        setPendingTemplateId(null);
      });
    } else {
      setSelectedTemplateId(pendingTemplateId);
      setPendingTemplateId(null);
    }
  }, [pendingTemplateId, isAuthenticated, openLoginModal, verifyTemplateAccess, addNotification]);

  // Auto-save draft to local storage (for the current session)
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('resume_builder_data', JSON.stringify(resumeData));
      localStorage.setItem('resume_builder_title', resumeTitle);
      localStorage.setItem('resume_builder_template_id', selectedTemplateId);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [resumeData, resumeTitle, selectedTemplateId]);

  // Auto-save to server when autoSave is enabled
  useEffect(() => {
    if (!isAuthenticated || !user?.autoSave) return;
    
    const timeout = setTimeout(async () => {
      try {
        // Only save if we have a resume title (indicating we're editing an existing resume)
        if (!resumeTitle) return;
        
        const storeKey = `saved_resumes_${user?.id || 'guest'}`;
        const savedResumes: SavedResume[] = JSON.parse(localStorage.getItem(storeKey) || '[]');
        
        // Find if we're editing an existing resume
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
        const editingId = urlParams.get('edit');
        
        let existingIdx = -1;
        if (editingId) {
          existingIdx = savedResumes.findIndex(r => r.id === editingId);
        }
        
        if (existingIdx >= 0) {
          // Update existing resume
          const currentTime = new Date();
          const updatedResume = {
            ...savedResumes[existingIdx],
            lastEdited: currentTime.toISOString(),
            data: resumeData
          };
          
          savedResumes[existingIdx] = updatedResume;
          localStorage.setItem(storeKey, JSON.stringify(savedResumes));
          
          // Update resume count
          updateResumeCount();
          
          console.log('Auto-saved resume to server');
        }
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, 800); // 800ms debounce
    
    return () => clearTimeout(timeout);
  }, [resumeData, resumeTitle, selectedTemplateId, isAuthenticated, user?.autoSave, user?.id, updateResumeCount]);

  const handleSave = async () => {
    const tpl = TEMPLATES.find(t => t.id === selectedTemplateId);
    const needsAuth = tpl ? tpl.requiresAuth !== false : true;

    if (!isAuthenticated && needsAuth) {
      addNotification("Please login to save your resume", "warning");
      openLoginModal('/dashboard');
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API Latency
    setTimeout(() => {
      try {
        const storeKey = `saved_resumes_${user?.id || 'guest'}`;
        const savedResumes: SavedResume[] = JSON.parse(localStorage.getItem(storeKey) || '[]');
        
        console.log('Current saved resumes before save:', savedResumes);
        console.log('Saving resume with title:', resumeTitle);
        
        // Check if we're editing an existing resume (look for matching ID in URL or state)
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
        const editingId = urlParams.get('edit');
        
        // If editing an existing resume, find it by ID
        let existingIdx = -1;
        if (editingId) {
          existingIdx = savedResumes.findIndex(r => r.id === editingId);
        }
        
        // Create timestamp for when this resume is saved
        const currentTime = new Date();
        
        const newResume: SavedResume = {
          id: existingIdx >= 0 ? savedResumes[existingIdx].id : `res_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          title: resumeTitle,
          templateId: selectedTemplateId,
          lastEdited: currentTime.toISOString(), // Store actual timestamp
          data: resumeData
        };

        if (existingIdx >= 0) {
          console.log('Updating existing resume at index:', existingIdx);
          savedResumes[existingIdx] = newResume;
        } else {
          console.log('Adding new resume to list (always append)');
          // ALWAYS append new resumes - never replace based on title
          savedResumes.unshift(newResume);
        }

        console.log('Final resumes array after save:', savedResumes);
        localStorage.setItem(storeKey, JSON.stringify(savedResumes));
        
        // Dispatch storage event to notify other components
        window.dispatchEvent(new StorageEvent('storage', {
          key: storeKey,
          newValue: JSON.stringify(savedResumes)
        }));
        
        // Also dispatch a custom event for better reliability
        window.dispatchEvent(new CustomEvent('customStorageUpdate', {
          detail: { key: storeKey, value: JSON.stringify(savedResumes) }
        }));
        
        // Update resume count in auth context
        updateResumeCount();
        
        addNotification(`"${resumeTitle}" saved successfully.`, 'success');
      } catch (err) {
        console.error(err);
        addNotification("Failed to save resume. Please try again.", "error");
      } finally {
        setIsSaving(false);
      }
    }, 800);
  };

  const handleDownloadPDF = async () => {
    const tpl = TEMPLATES.find(t => t.id === selectedTemplateId);
    const needsAuth = tpl ? tpl.requiresAuth !== false : true;

    if (!isAuthenticated && needsAuth) {
      addNotification("Please login to export your resume", "warning");
      openLoginModal('/dashboard');
      return;
    }

    if (!previewRef.current) {
      addNotification("Preview not available", "error");
      return;
    }

    if (needsAuth) {
      const accessResult = await verifyTemplateAccess(selectedTemplateId, 'download');
      if (!accessResult.success) {
        if (accessResult.status === 403) {
          addNotification('Upgrade your plan to download this template.', 'warning');
        } else if (accessResult.message) {
          addNotification(accessResult.message, 'error');
        }
        return;
      }
    }

    setIsDownloading(true);
    addNotification("Preparing your PDF download...", "info");

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
      const filename = resumeTitle ? `${resumeTitle.toLowerCase().replace(/\s+/g, '-')}.pdf` : 'resume.pdf';
      pdf.save(filename);

      addNotification(`Downloaded "${filename}"`, "success");
    } catch (err) {
      console.error('PDF generation failed:', err);
      addNotification("PDF generation failed. Please try again.", "error");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <DashboardLayout>
       {/* Builder Toolbar */}
       <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-sm">
         <div className="flex items-center gap-3">
           <div className="relative group">
              <input 
                type="text" 
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                className="text-xl font-bold text-text-main bg-transparent border-b border-dashed border-transparent hover:border-gray-300 focus:border-primary focus:outline-none px-1 transition-all"
                placeholder="My Resume Title"
              />
           </div>
           <span className="text-[10px] text-text-muted px-2 py-0.5 bg-gray-100 rounded-full font-bold uppercase tracking-widest">Draft</span>
         </div>
         
         <div className="flex items-center gap-2 ml-auto">
            <div className="hidden md:flex items-center gap-2 mr-4 border-r border-gray-200 pr-4">
              <Palette size={18} className="text-text-muted" />
              <select 
                className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer text-text-main font-semibold hover:text-primary transition-colors"
                value={selectedTemplateId}
                onChange={async (e) => {
                  const nextTemplateId = e.target.value;
                  const template = TEMPLATES.find(t => t.id === nextTemplateId);
                  const needsAuth = template ? template.requiresAuth !== false : true;
                  if (!isAuthenticated && needsAuth) {
                    addNotification("Please login to use this template", "warning");
                    openLoginModal('/dashboard');
                    return;
                  }
                  if (needsAuth) {
                    const accessResult = await verifyTemplateAccess(nextTemplateId, 'editor');
                    if (!accessResult.success) {
                      if (accessResult.status === 403) {
                        addNotification('Upgrade your plan to use this template.', 'warning');
                      }
                      return;
                    }
                  }
                  setSelectedTemplateId(nextTemplateId);
                }}
              >
                {TEMPLATES.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <Button 
              variant="secondary" 
              size="sm" 
              className="md:hidden"
              onClick={() => setShowMobilePreview(!showMobilePreview)}
              icon={<Eye size={16}/>}
            >
              {showMobilePreview ? 'Edit' : 'Preview'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              icon={isSaving ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Resume'}
            </Button>
            
            <Button 
              size="sm" 
              icon={isDownloading ? <Loader2 className="animate-spin" size={16}/> : <Download size={16}/>}
              onClick={handleDownloadPDF}
              disabled={isDownloading}
            >
              {isDownloading ? 'Exporting...' : 'Download PDF'}
            </Button>
         </div>
       </div>

       {/* Main Workspace */}
       <div className="flex h-[calc(100vh-128px)] overflow-hidden">
         {/* Left: Editor */}
         <div className={`
           w-full md:w-1/2 lg:w-5/12 xl:w-1/3 bg-white border-r border-gray-200 overflow-y-auto custom-scrollbar
           ${showMobilePreview ? 'hidden md:block' : 'block'}
         `}>
           <div className="p-4 sm:p-6 max-w-2xl mx-auto">
             <ResumeForm data={resumeData} onChange={setResumeData} />
           </div>
         </div>

         {/* Right: Preview */}
         <div className={`
            flex-1 bg-gray-200 overflow-y-auto custom-scrollbar p-4 sm:p-8 flex justify-center items-start
            ${showMobilePreview ? 'block fixed inset-0 z-40 bg-gray-200 mt-[115px] pb-32' : 'hidden md:flex'}
         `}>
            <div 
              ref={previewRef}
              className="bg-white shadow-2xl w-full max-w-[800px] min-h-[1100px] origin-top transition-transform duration-200 scale-100 xl:scale-100 lg:scale-[0.85] md:scale-[0.65]"
            >
               <LivePreview data={resumeData} templateId={selectedTemplateId} />
            </div>
         </div>
       </div>
    </DashboardLayout>
  );
};
