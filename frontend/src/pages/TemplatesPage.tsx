import React, { useState, useEffect } from 'react';
import { LayoutTemplate } from 'lucide-react';
import { TEMPLATES, INITIAL_RESUME_DATA } from '../data/templates';
import { TemplateCard } from '../components/templates/TemplateCard';
import { TemplateManager } from '../components/templates/TemplateManager';
import { ResumeData } from '../types';
import { useLocation } from '../components/layout/Navbar';
import { useAuth } from '../context/AuthContext';

export const TemplatesPage: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  const { search, navigate } = useLocation();
  const { isAuthenticated, user, openLoginModal, verifyTemplateAccess } = useAuth();
  
  // Enhanced user plan detection with fallback
  const userPlan = user?.plan || 'Free';
  // Lowercase version for comparisons with template access
  const userPlanLower = userPlan.toLowerCase();
  
  const [savedResumeData, setSavedResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  
  useEffect(() => {
    setSelectedTemplateId(null);
  }, [isAuthenticated]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // For new resumes, start with empty data
    // Only load saved data when explicitly editing an existing resume
    setSavedResumeData(INITIAL_RESUME_DATA);

    const params = new URLSearchParams(search);
    const idFromUrl = params.get('id');
    if (idFromUrl) {
      const template = TEMPLATES.find(t => t.id === idFromUrl);
      if (!template) return;

      // Check if user just logged in and had a stored template redirect
      const storedTemplateId = localStorage.getItem('post_login_redirect_template');
      
      const needsAuth = template.requiresAuth !== false;
      
      if (storedTemplateId === idFromUrl) {
        // User just logged in, clear the stored ID and proceed
        localStorage.removeItem('post_login_redirect_template');
        
        if (!isAuthenticated && needsAuth) {
          openLoginModal(`/templates?id=${idFromUrl}`);
          return;
        }

        if (needsAuth) {
          verifyTemplateAccess(idFromUrl, 'editor').then(result => {
            if (result.success) {
              setSelectedTemplateId(idFromUrl);
              setIsEditorOpen(true);
            } else if (result.status === 403) {
              navigate('/pricing');
            }
          });
        } else {
          setSelectedTemplateId(idFromUrl);
          setIsEditorOpen(true);
        }
      } else {
        if (!isAuthenticated && needsAuth) {
          openLoginModal(`/templates?id=${idFromUrl}`);
          return;
        }

        if (needsAuth) {
          verifyTemplateAccess(idFromUrl, 'editor').then(result => {
            if (result.success) {
              setSelectedTemplateId(idFromUrl);
              setIsEditorOpen(true);
            } else if (result.status === 403) {
              navigate('/pricing');
            }
          });
        } else {
          setSelectedTemplateId(idFromUrl);
          setIsEditorOpen(true);
        }
      }
    }
  }, [search, isAuthenticated, userPlan, navigate, openLoginModal, verifyTemplateAccess]);

  const handleUseTemplate = async (id: string) => {
    const template = TEMPLATES.find(t => t.id === id);
    if (!template) return;

    const needsAuth = template.requiresAuth !== false;

    if (!isAuthenticated && needsAuth) {
      localStorage.setItem('post_login_redirect_template', id);
      openLoginModal(`/templates?id=${id}`);
      return;
    }

    if (needsAuth) {
      const accessResult = await verifyTemplateAccess(id, 'editor');
      if (!accessResult.success) {
        if (accessResult.status === 403) {
          navigate('/pricing');
        }
        return;
      }
    }

    navigate(`/dashboard?template=${id}`);
  };

  const handleSave = (newData: ResumeData) => {
    setSavedResumeData(newData);
    localStorage.setItem('user_resume_data', JSON.stringify(newData));
  };

  const handleCancel = () => {
    setIsEditorOpen(false);
    setSelectedTemplateId(null);
    navigate('/templates');
  };

  if (isEditorOpen && selectedTemplateId) {
    return (
      <TemplateManager 
        templateId={selectedTemplateId}
        initialData={savedResumeData}
        onSave={handleSave}
        onCancel={handleCancel}
        isAuthenticated={isAuthenticated}
      />
    );
  }

  return (
    <div className="pb-12 animate-fade-in">
      <section className="relative py-16 bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border border-indigo-100 shadow-sm mb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-xl text-primary mb-6 shadow-sm border border-gray-100">
            <LayoutTemplate size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Design Your <span className="text-primary">Future</span>
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Choose from pixel-perfect templates, optimized for ATS and recruiters.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {TEMPLATES.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={handleUseTemplate}
              isSelected={template.id === selectedTemplateId}
              isAuthenticated={isAuthenticated}
              userPlan={userPlan}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
