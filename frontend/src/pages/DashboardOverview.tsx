import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useToast } from '../context/ToastContext';
import { Link, useLocation } from '../components/layout/Navbar';
import { SavedResume } from '../types';
import { TEMPLATES } from '../data/templates';
import { TemplateCard } from '../components/templates/TemplateCard';
import { 
  FileText, 
  Plus, 
  Sparkles, 
  TrendingUp, 
  Download, 
  Award, 
  ChevronRight, 
  Zap, 
  Clock, 
  ArrowRight,
  Trash2,
  Edit2,
  Lightbulb,
  LayoutTemplate,
  Settings
} from 'lucide-react';
import { DeleteConfirmModal } from '../components/ui/DeleteConfirmModal';
import { apiUrl } from '../utils/api';

export const DashboardOverview: React.FC = () => {
  const { user, isAuthenticated, updateResumeCount, openLoginModal, verifyTemplateAccess } = useAuth();
  const { addNotification } = useNotifications();
  const { showToast } = useToast();
  const { navigate } = useLocation();
  
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load user resumes
  useEffect(() => {
    const loadResumes = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch(apiUrl('/resume/all'), {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('resume_ai_token')}`
            }
          });
          
          if (response.ok) {
            const apiResumes = await response.json();
            
            // Merge API data with existing localStorage so local-only fields (e.g. thumbnail) are preserved
            const storeKey = `saved_resumes_${user?.id || 'guest'}`;
            const existingResumes: SavedResume[] = JSON.parse(localStorage.getItem(storeKey) || '[]');
            const existingMap = new Map(existingResumes.map(r => [r.id, r]));
            
            const formattedResumes: SavedResume[] = apiResumes.map((res: any) => {
              const existing = existingMap.get(res._id);
              return {
                id: res._id,
                title: res.title,
                templateId: res.templateId,
                lastEdited: new Date(res.lastEdited).toISOString(),
                data: res.data,
                thumbnail: res.thumbnail || existing?.thumbnail
              };
            });
            
            // Update state and also update localStorage
            setResumes(formattedResumes);
            
            localStorage.setItem(storeKey, JSON.stringify(formattedResumes));
          }
        } catch (err) {
          console.error('Failed to load resumes from API, falling back to localStorage', err);
          // Fallback to localStorage
          const storeKey = `saved_resumes_${user?.id || 'guest'}`;
          const stored = localStorage.getItem(storeKey);
          if (stored) {
            try {
              setResumes(JSON.parse(stored));
            } catch (e) {
              console.error('Failed to parse resumes on dashboard overview:', e);
            }
          }
        }
      } else {
        // Not authenticated, use localStorage
        const storeKey = `saved_resumes_${user?.id || 'guest'}`;
        const stored = localStorage.getItem(storeKey);
        if (stored) {
          try {
            setResumes(JSON.parse(stored));
          } catch (e) {
            console.error('Failed to parse resumes on dashboard overview:', e);
          }
        }
      }
    };
    
    loadResumes();
  }, [user, isAuthenticated]);

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

  const handleEdit = (resume: SavedResume) => {
    localStorage.setItem('resume_builder_data', JSON.stringify(resume.data));
    localStorage.setItem('resume_builder_title', resume.title);
    localStorage.setItem('resume_builder_template_id', resume.templateId);
    navigate(`/dashboard?edit=${resume.id}`);
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    
    try {
      // Call delete API first if authenticated
      if (isAuthenticated) {
        const response = await fetch(apiUrl(`/resume/${deleteId}`), {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('resume_ai_token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Failed to delete resume from server');
      }
      
      // Update local state and localStorage regardless
      const updated = resumes.filter(r => r.id !== deleteId);
      setResumes(updated);
      const storeKey = `saved_resumes_${user?.id || 'guest'}`;
      localStorage.setItem(storeKey, JSON.stringify(updated));
      
      // Update count in Auth Context
      updateResumeCount();

      showToast("Resume deleted successfully", "success");
      addNotification("Resume deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete resume", "error");
      addNotification("Failed to delete resume", "error");
    } finally {
      setDeleteId(null);
      setIsDeleting(false);
    }
  };

  // Profile strength rating calculation
  const getProfileStrength = () => {
    if (!user) return 30;
    let score = 30;
    if (user.phone) score += 15;
    if (user.location) score += 15;
    if (user.bio || user.username) score += 20;
    if (resumes.length > 0) score += 20;
    return Math.min(score, 100);
  };

  const profileStrength = getProfileStrength();
  const recentResumes = resumes.slice(0, 3);
  const recommendedTemplates = ['modern', 'professional', 'minimalist', 'executive'].map(id => TEMPLATES.find(t => t.id === id)!);

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-[calc(100vh-80px)] space-y-6 font-sans">
        
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-indigo-900 p-5 sm:p-7 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-400 opacity-20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              Welcome back, {user?.name || 'Guest User'}! 👋
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Ready to craft the perfect resume? Edit your existing documents or generate a new tailored masterpiece.
            </p>
            
            {(!user?.plan || user.plan === 'Free') && (
              <div className="mt-4">
                <Link
                  to="/pricing"
                  className="bg-white hover:bg-slate-50 text-primary font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 border border-slate-200 hover:border-slate-300 flex items-center gap-2 text-sm"
                >
                  <Zap size={16} />
                  Upgrade to Pro
                </Link>
              </div>
            )}
          </div>
        </div>



        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Resumes */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Recent Resumes</h2>
              <Link
                to="/dashboard/resumes"
                className="text-indigo-600 hover:text-indigo-700 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                View All
                <ChevronRight size={14} />
              </Link>
            </div>

            {recentResumes.length > 0 ? (
              <div className="space-y-3">
                {recentResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="bg-white border border-slate-100 rounded-xl p-4 flex items-center justify-between gap-3 hover:border-indigo-100 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                        <FileText size={16} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                          {resume.title || 'Untitled Resume'}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <Clock size={12} />
                          Updated: {new Date(resume.lastEdited).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(resume)}
                        title="Edit"
                        className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-all duration-200"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(resume.id, e)}
                        title="Delete"
                        className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-all duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-100 rounded-2xl p-7 text-center">
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-400 rounded-full inline-block mb-4">
                  <FileText size={36} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1.5">No resumes yet</h3>
                <p className="text-sm text-slate-500 mb-4">Create your first professional resume to get started</p>
                <button
                  onClick={() => navigate('/templates')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-md"
                >
                  <Plus size={18} />
                  Create Your First Resume
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm min-h-[300px]">
              <h3 className="font-bold text-slate-900 text-base mb-3">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/templates')}
                  className="w-full flex items-center gap-3 p-3.5 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 rounded-2xl text-left transition-all duration-300 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Plus size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 text-sm">New Resume</div>
                    <div className="text-sm text-slate-500">Pick a template</div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </button>

                <button
                  onClick={() => navigate('/profile')}
                  className="w-full flex items-center gap-3 p-3.5 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-100 rounded-2xl text-left transition-all duration-300 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Zap size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 text-sm">Edit Profile</div>
                    <div className="text-sm text-slate-500">Update your details</div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </button>

                <button
                  onClick={() => navigate('/settings')}
                  className="w-full flex items-center gap-3 p-3.5 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 rounded-2xl text-left transition-all duration-300 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Settings size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 text-sm">Settings</div>
                    <div className="text-sm text-slate-500">Preferences</div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Templates */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recommended Templates</h2>
            <Link
              to="/templates"
              className="text-indigo-600 hover:text-indigo-700 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              Browse All
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {recommendedTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={handleUseTemplate}
                isSelected={false}
                isAuthenticated={isAuthenticated}
                userPlan={user?.plan || 'Free'}
              />
            ))}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <DeleteConfirmModal 
            title="Delete Resume?"
            message="Are you sure you want to delete this resume? This cannot be undone."
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeleteId(null)}
            isDeleting={isDeleting}
          />
        )}
      </div>
    </DashboardLayout>
  );
};