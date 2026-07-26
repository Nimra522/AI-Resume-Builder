import React from 'react';
import { SavedResume } from '../../types';
import { MoreVertical, Edit3, Download, Trash2, Clock } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

const formatResumeLastEdited = (lastEdited: string | number | Date) => {
  const date = new Date(lastEdited);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

interface ResumeCardProps {
  resume: SavedResume;
  onEdit: (resume: SavedResume) => void;
  onDelete: (resume: SavedResume) => void;
  onDownload: (resume: SavedResume) => void;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({ resume, onEdit, onDelete, onDownload }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setShowMenu(false));

  // Determine styles based on template ID to give a visual hint
  const getThumbnailStyle = (id: string) => {
    switch (id) {
      case 'modern': return 'border-l-4 border-indigo-500 bg-gray-50';
      case 'tech': return 'border-l-4 border-green-500 bg-gray-900 text-white opacity-80';
      case 'creative': return 'border-t-4 border-pink-500 bg-pink-50/30';
      case 'executive': return 'border-b-4 border-yellow-600 bg-slate-50';
      default: return 'border-t-4 border-gray-300 bg-white';
    }
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col relative resume-card">
      
      {/* Thumbnail Area (Clickable) */}
      <div 
        className="relative aspect-[8/11] bg-gray-100 cursor-pointer overflow-hidden border-b border-gray-100 flex items-center justify-center"
        onClick={() => onEdit(resume)}
      >
        {resume.thumbnail ? (
          <img
            src={resume.thumbnail}
            alt={resume.title}
            className="w-full h-full object-contain object-center bg-white"
          />
        ) : (
          <div className={`absolute inset-4 shadow-sm bg-white p-3 transform group-hover:scale-105 transition-transform duration-500 origin-top flex flex-col gap-2 ${getThumbnailStyle(resume.templateId)}`}>
             {/* Abstract Lines */}
             <div className="h-3 w-1/2 bg-current opacity-20 rounded-sm mb-2"></div>
             <div className="h-1.5 w-full bg-current opacity-10 rounded-sm"></div>
             <div className="h-1.5 w-5/6 bg-current opacity-10 rounded-sm"></div>
             <div className="h-1.5 w-full bg-current opacity-10 rounded-sm"></div>
             <div className="h-10 w-full bg-current opacity-5 rounded-sm mt-2"></div>
          </div>
        )}

        {/* Edit Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
           <span className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full shadow-sm text-primary">Open Editor</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 
            className="font-bold text-text-main truncate pr-2 cursor-pointer hover:text-primary transition-colors"
            onClick={() => onEdit(resume)}
            title={resume.title}
          >
            {resume.title}
          </h3>
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <MoreVertical size={16} />
            </button>
            
            {showMenu && (
              <div 
                className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-1 animate-fade-in origin-top-right resume-dropdown-menu"
                style={{
                  position: 'absolute',
                  right: '0',
                  marginTop: '0.25rem',
                  minWidth: '10rem',
                  zIndex: 50
                }}
              >
                <button onClick={() => { onEdit(resume); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-text-main hover:bg-gray-50 flex items-center gap-2">
                  <Edit3 size={14} /> Edit
                </button>
                <button onClick={() => { onDownload(resume); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-text-main hover:bg-gray-50 flex items-center gap-2">
                  <Download size={14} /> Download
                </button>
                <div className="h-px bg-gray-100 my-1"></div>
                <button 
                  onClick={() => { 
                    onDelete(resume); 
                    setShowMenu(false); 
                  }} 
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-text-muted mb-4 capitalize">{resume.templateId} Template</p>

        <div className="mt-auto flex items-center text-xs text-text-muted">
           <Clock size={12} className="mr-1.5" />
           {formatResumeLastEdited(resume.lastEdited)}
        </div>
      </div>
    </div>
  );
};
