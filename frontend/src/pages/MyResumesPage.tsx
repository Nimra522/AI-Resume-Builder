
import React, { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ResumeCard } from '../components/resume/ResumeCard';
import { EmptyState } from '../components/ui/EmptyState';
import { DeleteConfirmModal } from '../components/ui/DeleteConfirmModal';
import { SavedResume } from '../types';

import { Search, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useLocation } from '../components/layout/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useToast } from '../context/ToastContext';
import { LivePreview } from '../components/resume/LivePreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { apiUrl } from '../utils/api';

export const MyResumesPage: React.FC = () => {
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { navigate } = useLocation();
  const { user, updateResumeCount } = useAuth();
  const { addNotification } = useNotifications();
  const { showToast } = useToast();
  
  console.log('MyResumesPage rendered with', resumes.length, 'resumes');
  
  // Track component mount/unmount and load resumes
  useEffect(() => {
    // Load resumes when component mounts
    const loadResumesFromStorage = () => {
      const storeKey = `saved_resumes_${user?.id || 'guest'}`;
      const stored = localStorage.getItem(storeKey);
      if (stored) {
        try {
          const parsedResumes = JSON.parse(stored);
          setResumes(parsedResumes);
        } catch (e) {
          console.error('Failed to parse saved resumes on mount:', e);
          setResumes([]);
        }
      } else {
        setResumes([]);
      }
    };
    
    loadResumesFromStorage();
    
    // Reload on focus to catch external changes
    const handleFocus = () => {
      console.log('Window focused, reloading resumes');
      loadResumesFromStorage();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      console.log('MyResumesPage unmounting');
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Listen for storage changes to refresh when resumes are saved from other tabs/components
  useEffect(() => {
    const loadResumes = () => {
      const storeKey = `saved_resumes_${user?.id || 'guest'}`;
      const stored = localStorage.getItem(storeKey);
      if (stored) {
        try {
          const parsedResumes = JSON.parse(stored);
          console.log('Loaded resumes from localStorage:', parsedResumes);
          // Always set the state to ensure we have the latest data
          setResumes(prevResumes => {
            // Only update if the data is actually different
            if (JSON.stringify(prevResumes) !== JSON.stringify(parsedResumes)) {
              console.log('Resumes updated in state');
              return parsedResumes;
            }
            return prevResumes;
          });
        } catch (e) {
          console.error('Failed to parse saved resumes:', e);
          setResumes([]);
        }
      } else {
        // Initialize with empty array if no saved resumes
        console.log('No saved resumes found, initializing empty array');
        setResumes([]);
      }
    };
    
    // Listen for storage changes to refresh when resumes are saved from other tabs/components
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('saved_resumes_')) {
        console.log('Storage changed, reloading resumes');
        loadResumes();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events dispatched by ResumeBuilder
    const handleCustomStorageEvent = () => {
      console.log('Custom storage event received, reloading resumes');
      loadResumes();
    };
    
    window.addEventListener('customStorageUpdate', handleCustomStorageEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('customStorageUpdate', handleCustomStorageEvent);
    };
  }, [user]);

  const filteredResumes = resumes.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.templateId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (resume: SavedResume) => {
    localStorage.setItem('resume_builder_data', JSON.stringify(resume.data));
    localStorage.setItem('resume_builder_title', resume.title);
    localStorage.setItem('resume_builder_template_id', resume.templateId);
    // Pass the resume ID for editing
    navigate(`/dashboard?edit=${resume.id}`); 
  };

  const handleDeleteClick = (resume: SavedResume) => {
    setDeleteId(resume.id);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    
    try {
      // First, try to delete from API
      let apiSuccess = false;
      let apiErrorOccurred = false;
      
      try {
        const response = await fetch(apiUrl(`/resume/${deleteId}`), {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        apiSuccess = response.ok;
        if (!apiSuccess) {
          console.warn('API delete failed, falling back to local delete');
        }
      } catch (apiError) {
        console.warn('API call failed, falling back to local delete:', apiError);
        apiErrorOccurred = true;
      }
      
      // Always update local state regardless of API success
      const updated = resumes.filter(r => r.id !== deleteId);
      
      // Update state and localStorage
      setResumes(updated);
      const storeKey = `saved_resumes_${user?.id || 'guest'}`;
      localStorage.setItem(storeKey, JSON.stringify(updated));
      
      // Update resume count in auth context
      updateResumeCount();
      
      // Reset delete state
      setDeleteId(null);
      setIsDeleting(false);
      
      // Show appropriate message based on API result
      if (apiSuccess || !apiErrorOccurred) {
        showToast("Resume deleted successfully", "success");
        addNotification("Resume deleted successfully", "success");
      } else {
        // API failed but local delete succeeded
        showToast("Resume deleted locally. Sync may be required.", "warning");
        addNotification("Resume deleted locally. Sync may be required.", "warning");
      }
      
    } catch (error) {
      console.error('Delete operation failed:', error);
      showToast("Failed to delete resume. Please try again.", "error");
      addNotification("Failed to delete resume. Please try again.", "error");
      setIsDeleting(false);
    }
  };

  const handleDownload = async (resume: SavedResume) => {
    showToast(`Preparing download for ${resume.title}...`, "info");
    addNotification(`Preparing download for ${resume.title}...`, "info");
    
    // Create a temporary hidden div with standard resume dimensions
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '800px';
    tempDiv.style.minHeight = '1100px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '0';
    tempDiv.style.margin = '0';
    
    // Create resume content container
    const resumeContainer = document.createElement('div');
    resumeContainer.style.width = '100%';
    resumeContainer.style.minHeight = '1100px';
    tempDiv.appendChild(resumeContainer);
    document.body.appendChild(tempDiv);
    
    try {
      // Render resume content
      resumeContainer.innerHTML = `
        <div style="width: 100%; min-height: 1100px; font-family: system-ui, sans-serif;" data-pdf-context="true">
          <div style="padding: 40px; color: #374151;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="font-size: 28px; font-weight: bold; margin: 0 0 8px 0;">${resume.data.personalInfo.fullName || 'Your Name'}</h1>
              <h2 style="font-size: 18px; color: #4f46e5; margin: 0 0 16px 0;">${resume.data.personalInfo.jobTitle || 'Job Title'}</h2>
              <div style="font-size: 14px; color: #6b7280;">
                ${resume.data.personalInfo.email || 'email@example.com'} | 
                ${resume.data.personalInfo.phone || '(555) 123-4567'} | 
                ${resume.data.personalInfo.location || 'City, State'}
              </div>
            </div>
            
            ${resume.data.personalInfo.summary ? `
            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 16px; font-weight: bold; margin: 0 0 12px 0; text-transform: uppercase; border-bottom: 2px solid #374151; padding-bottom: 4px;">Summary</h3>
              <p style="font-size: 14px; line-height: 1.5; margin: 0;">${resume.data.personalInfo.summary}</p>
            </div>` : ''}
            
            ${resume.data.experience.length > 0 ? `
            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 16px; font-weight: bold; margin: 0 0 12px 0; text-transform: uppercase; border-bottom: 2px solid #374151; padding-bottom: 4px;">Experience</h3>
              ${resume.data.experience.map(exp => `
                <div style="margin-bottom: 16px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <h4 style="font-size: 16px; font-weight: bold; margin: 0 0 4px 0;">${exp.role}</h4>
                      <div style="font-size: 14px; font-weight: 600; color: #4f46e5; margin: 0 0 4px 0;">${exp.company}</div>
                    </div>
                    <div style="font-size: 14px; color: #6b7280; text-align: right;">
                      <div>${exp.startDate} - ${exp.endDate || 'Present'}</div>
                    </div>
                  </div>
                  <p style="font-size: 14px; line-height: 1.5; margin: 8px 0 0 0;">${exp.description}</p>
                </div>
              `).join('')}
            </div>` : ''}
            
            ${resume.data.education.length > 0 ? `
            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 16px; font-weight: bold; margin: 0 0 12px 0; text-transform: uppercase; border-bottom: 2px solid #374151; padding-bottom: 4px;">Education</h3>
              ${resume.data.education.map(edu => `
                <div style="margin-bottom: 16px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <h4 style="font-size: 16px; font-weight: bold; margin: 0 0 4px 0;">${edu.degree}</h4>
                      <div style="font-size: 14px; font-weight: 600; color: #4f46e5; margin: 0 0 4px 0;">${edu.school}</div>
                    </div>
                    <div style="font-size: 14px; color: #6b7280; text-align: right;">
                      <div>${edu.graduationDate}</div>
                    </div>
                  </div>
                  ${edu.description ? `<p style="font-size: 14px; line-height: 1.5; margin: 8px 0 0 0;">${edu.description}</p>` : ''}
                </div>
              `).join('')}
            </div>` : ''}
          </div>
        </div>
      `;
      
      // Wait for content to fully render
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Capture with exact dimensions
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        width: tempDiv.offsetWidth,
        height: tempDiv.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          // Set PDF mode for templates that need special styling
          clonedDoc.body.setAttribute('data-pdf-mode', 'true');
          
          // Also add class to html element for broader detection
          clonedDoc.documentElement.classList.add('html2canvas');
          
          const images = clonedDoc.getElementsByTagName('img');
          Array.from(images).forEach(img => {
            if (img.src) {
              img.crossOrigin = 'anonymous';
            }
          });
        }
      });
      
      // Create PDF matching canvas dimensions exactly
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      // Add image at 100% size
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      
      // Save PDF
      const filename = `${resume.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      pdf.save(filename);
      
      showToast(`Downloaded "${filename}"`, "success");
      addNotification(`Downloaded "${filename}"`, "success");
    } catch (error) {
      console.error('PDF generation failed:', error);
      showToast("PDF generation failed. Please try again.", "error");
      addNotification("PDF generation failed. Please try again.", "error");
    } finally {
      document.body.removeChild(tempDiv);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">My Resumes</h1>
            <p className="text-slate-500 mt-1">Manage and edit your saved documents.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search resumes..."
                className="block w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => navigate('/templates')}
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Plus size={20} />
              Create New
            </button>
          </div>
        </div>

        {filteredResumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up resume-grid-container">
            {filteredResumes.map(resume => (
              <ResumeCard 
                key={resume.id} 
                resume={resume} 
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onDownload={handleDownload}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="You haven't created any resumes yet." 
            description="Create your first professional resume to get started."
            actionText="Create Resume"
            actionLink="/templates"
          />
        )}

        {deleteId && (
          <DeleteConfirmModal 
            title="Delete Resume?"
            message="Are you sure you want to delete this resume?"
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeleteId(null)}
            isDeleting={isDeleting}
          />
        )}
      </div>
    </DashboardLayout>
  );
};
