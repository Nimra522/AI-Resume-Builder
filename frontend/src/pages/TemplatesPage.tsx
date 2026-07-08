
import React, { useEffect } from 'react';
import { LayoutTemplate } from 'lucide-react';
import { TEMPLATES } from '../data/templates';
import { TemplateCard } from '../components/templates/TemplateCard';
import { useLocation } from '../components/layout/Navbar';
import { useAuth } from '../context/AuthContext';

export const TemplatesPage: React.FC = () => {
  const { search, navigate } = useLocation();
  const { isAuthenticated, user, openLoginModal, verifyTemplateAccess } = useAuth();
  
  // Enhanced user plan detection with fallback
  const userPlan = user?.plan || 'Free';

  useEffect(() => {
    window.scrollTo(0, 0);

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
              navigate(`/dashboard?template=${idFromUrl}`);
            } else if (result.status === 403) {
              navigate('/pricing');
            }
          });
        } else {
          navigate(`/dashboard?template=${idFromUrl}`);
        }
      } else {
        if (!isAuthenticated && needsAuth) {
          openLoginModal(`/templates?id=${idFromUrl}`);
          return;
        }

        if (needsAuth) {
          verifyTemplateAccess(idFromUrl, 'editor').then(result => {
            if (result.success) {
              navigate(`/dashboard?template=${idFromUrl}`);
            } else if (result.status === 403) {
              navigate('/pricing');
            }
          });
        } else {
          navigate(`/dashboard?template=${idFromUrl}`);
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

  return (
    <div className="space-y-12 pb-16 bg-gray-50">
      <section className="pt-24 pb-16 bg-gradient-to-r from-gray-900 to-indigo-900 border-b border-indigo-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 opacity-20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
            <LayoutTemplate size={14} className="text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300 tracking-widest uppercase">Resume Templates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Design Your Future
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl">
            Choose from pixel-perfect templates, optimized for ATS and recruiters.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {TEMPLATES.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={handleUseTemplate}
              isSelected={false}
              isAuthenticated={isAuthenticated}
              userPlan={userPlan}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
