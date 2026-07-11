
import React, { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ResumeForm } from '../components/resume/ResumeForm';
import { LivePreview } from '../components/resume/LivePreview';
import { INITIAL_RESUME_DATA, TEMPLATES } from '../data/templates';
import { ResumeData, SavedResume } from '../types';
import { Download, Eye, Palette, Save, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../components/layout/Navbar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { apiUrl } from '../utils/api';
import * as resumeValidation from '../utils/resumeValidation';

export const ResumeBuilder: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [selectedTemplateId, setSelectedTemplateId] = useState('modern');
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const hasLoadedResume = useRef(false); // Add ref to track if resume is already loaded
  
  const { search, navigate } = useLocation();
  const { addNotification } = useNotifications();
  const { user, isAuthenticated, openLoginModal, updateResumeCount, verifyTemplateAccess } = useAuth();
  const previewRef = useRef<HTMLDivElement>(null);

  // Load from local storage if available, and check template param
  useEffect(() => {
    // If we've already loaded the resume, don't run this effect again!
    if (hasLoadedResume.current) {
      console.log('Resume already loaded, skipping initial load');
      return;
    }
    
    console.log('ResumeBuilder mounting/updating, loading saved data...');
    const savedData = localStorage.getItem('resume_builder_data');
    const savedTitle = localStorage.getItem('resume_builder_title');
    const savedTemplate = localStorage.getItem('resume_builder_template_id');
    
    console.log('Found saved data:', { savedData: !!savedData, savedTitle: !!savedTitle, savedTemplate: !!savedTemplate });
    
    // Check for template parameter in URL
    const urlParams = new URLSearchParams(search);
    const templateParam = urlParams.get('template');
    const editParam = urlParams.get('edit');
    
    // Handle template param first
    if (templateParam) {
      console.log('Template parameter found in URL:', templateParam);
      const template = TEMPLATES.find(t => t.id === templateParam);
      const needsAuth = template ? template.requiresAuth !== false : true;

      if (!isAuthenticated && needsAuth) {
        openLoginModal(`/dashboard?template=${templateParam}`);
        return;
      }

      if (needsAuth) {
        verifyTemplateAccess(templateParam, 'editor').then(result => {
          if (result.success) {
            hasLoadedResume.current = true;
            setSelectedTemplateId(templateParam);
            // Clear localStorage for new template to start fresh
            localStorage.removeItem('resume_builder_data');
            localStorage.removeItem('resume_builder_title');
            setResumeData(INITIAL_RESUME_DATA);
            setResumeTitle('');
          } else if (result.status === 403) {
            addNotification('Upgrade your plan to use this template.', 'warning');
          }
        });
      } else {
        hasLoadedResume.current = true;
        setSelectedTemplateId(templateParam);
        // Clear localStorage for new template to start fresh
        localStorage.removeItem('resume_builder_data');
        localStorage.removeItem('resume_builder_title');
        setResumeData(INITIAL_RESUME_DATA);
        setResumeTitle('');
      }
    } else if (editParam) {
      console.log('Edit parameter found in URL:', editParam);
      // Try to load from API first if authenticated
      const loadResume = async () => {
        if (isAuthenticated) {
          try {
            const response = await fetch(apiUrl(`/resume/${editParam}`), {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('resume_ai_token')}`
              }
            });
            if (response.ok) {
              const resume = await response.json();
              hasLoadedResume.current = true; // Mark resume as loaded
              setResumeData(resume.data);
              setResumeTitle(resume.title);
              setSelectedTemplateId(resume.templateId);
              
              // Also update localStorage as fallback
              localStorage.setItem('resume_builder_data', JSON.stringify(resume.data));
              localStorage.setItem('resume_builder_title', resume.title);
              localStorage.setItem('resume_builder_template_id', resume.templateId);
              return;
            }
          } catch (err) {
            console.error('Failed to load resume from API, falling back to localStorage', err);
          }
        }
        
        // Fallback to localStorage if API fails or not authenticated
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            console.log('Parsed data:', parsedData.personalInfo);
            const normalizedData = {
              ...parsedData,
              personalInfo: {
                ...parsedData.personalInfo,
                countryCode: parsedData.personalInfo.countryCode || '+1'
              }
            };
            hasLoadedResume.current = true;
            setResumeData(normalizedData);
            if (savedTitle) setResumeTitle(savedTitle);
            if (savedTemplate) setSelectedTemplateId(savedTemplate);
          } catch (e) {
            console.error('Failed to load resume data', e);
          }
        }
      };
      
      loadResume();
    } else {
      // If no params, use saved data (if valid) or defaults
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
            hasLoadedResume.current = true;
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
            hasLoadedResume.current = true;
            setResumeData(normalizedData);
            if (savedTitle) setResumeTitle(savedTitle);
            if (savedTemplate) setSelectedTemplateId(savedTemplate);
          }
        } catch (e) {
          console.error('Failed to load resume data', e);
        }
      } else {
        // If no saved data, use defaults
        hasLoadedResume.current = true;
        if (savedTemplate) setSelectedTemplateId(savedTemplate);
        else setSelectedTemplateId('modern');
      }
    }
  }, [search, isAuthenticated, openLoginModal, verifyTemplateAccess, addNotification]);

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
        const urlParams = new URLSearchParams(window.location.search);
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
    
    // Validate title first
    if (!resumeTitle || !resumeTitle.trim()) {
      setTitleError('Resume title is required');
      return;
    }
    setTitleError('');

    // Validate resume data
    const { isValid } = resumeValidation.validateResumeBeforeSave(resumeData);
    if (!isValid) {
      addNotification('Please fix the highlighted errors before saving your resume.', 'error');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Check if we're editing an existing resume
      const urlParams = new URLSearchParams(search);
      const editingId = urlParams.get('edit');
      
      const requestData = {
        title: resumeTitle,
        data: resumeData,
        templateId: selectedTemplateId,
        resumeId: editingId // send only if editing
      };
      
      // Call backend API
      const response = await fetch(apiUrl('/resume/save'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('resume_ai_token')}`
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        let errorMsg = 'Failed to save resume. Please try again.';
        try {
          const errorData = await response.json();
          if (errorData.message) errorMsg = errorData.message;
        } catch (_) {}
        throw new Error(errorMsg);
      }
      
      const savedResume = await response.json();
      
      // Update localStorage as a fallback and for quick UX
      const storeKey = `saved_resumes_${user?.id || 'guest'}`;
      let savedResumes: SavedResume[] = JSON.parse(localStorage.getItem(storeKey) || '[]');
      
      const existingIdx = savedResumes.findIndex(r => r.id === editingId || r.id === savedResume._id);
      
      const newResume: SavedResume = {
        id: savedResume._id,
        title: savedResume.title,
        templateId: savedResume.templateId,
        lastEdited: new Date(savedResume.lastEdited).toISOString(),
        data: savedResume.data
      };
      
      if (existingIdx >= 0) {
        savedResumes[existingIdx] = newResume;
      } else {
        savedResumes.unshift(newResume);
      }
      
      localStorage.setItem(storeKey, JSON.stringify(savedResumes));
      
      // Update URL with actual saved resume ID if not already there
      if (!editingId) {
        navigate(`/dashboard?edit=${savedResume._id}`);
      }
      
      // Update resume count
      updateResumeCount();
      
      addNotification(`"${resumeTitle}" saved successfully.`, 'success');
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to save resume. Please try again.';
      addNotification(errorMessage, "error");
    } finally {
      setIsSaving(false);
    }
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
      <div className="flex flex-col h-full overflow-hidden">
        {/* Builder Toolbar */}
        <div className="z-20 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2 shadow-md flex-shrink-0">
          <div className="flex items-start gap-3">
            <Input 
              label=""
              type="text"
              value={resumeTitle}
              onChange={(e) => {
                setResumeTitle(e.target.value);
                if (titleError) setTitleError('');
              }}
              error={titleError}
              placeholder="Untitled Resume"
              className="text-base font-bold text-gray-900 shadow-sm !p-0 !w-64"
            />
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <div className="hidden md:flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
              <Palette size={16} className="text-indigo-600" />
              <select 
                className="text-xs border-none bg-transparent focus:ring-0 cursor-pointer text-gray-800 font-semibold outline-none"
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
              className="md:hidden shadow-sm text-xs h-8"
              onClick={() => setShowMobilePreview(!showMobilePreview)}
              icon={<Eye size={14}/>}
            >
              {showMobilePreview ? 'Edit' : 'Preview'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              icon={isSaving ? <Loader2 className="animate-spin" size={14}/> : <Save size={14}/>}
              onClick={handleSave}
              disabled={isSaving}
              className="shadow-sm text-xs h-8"
            >
              {isSaving ? 'Saving...' : 'Save Resume'}
            </Button>
            
            <Button 
              size="sm" 
              icon={isDownloading ? <Loader2 className="animate-spin" size={14}/> : <Download size={14}/>}
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="shadow-lg hover:shadow-xl transition-shadow text-xs h-8"
            >
              {isDownloading ? 'Exporting...' : 'Download PDF'}
            </Button>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex flex-1 overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
         {/* Left: Editor */}
         <div className={`
           w-full md:w-1/2 lg:w-5/12 xl:w-1/3 bg-white border-r border-gray-200 overflow-y-auto custom-scrollbar
           ${showMobilePreview ? 'hidden md:block' : 'block'}
         `}>
           <div className="p-5 sm:p-8 max-w-2xl mx-auto">
             <ResumeForm data={resumeData} onChange={setResumeData} onSave={handleSave} isSaving={isSaving} />
           </div>
         </div>

         {/* Right: Preview */}
         <div className={`
            flex-1 bg-gradient-to-br from-gray-100 to-gray-200 overflow-y-auto custom-scrollbar p-5 sm:p-10 flex justify-center items-start
            ${showMobilePreview ? 'block fixed inset-0 z-40 bg-gradient-to-br from-gray-100 to-gray-200 top-[calc(5rem+var(--toolbar-height,3.5rem))]' : 'hidden md:flex'}
         `}>
            <div 
              ref={previewRef}
              className="bg-white shadow-2xl rounded-sm w-full max-w-[800px] min-h-[1100px] origin-top transition-all duration-300 scale-100 xl:scale-100 lg:scale-[0.85] md:scale-[0.65] hover:shadow-3xl"
            >
               <LivePreview data={resumeData} templateId={selectedTemplateId} />
            </div>
         </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
