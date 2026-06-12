
import React, { useRef, useState } from 'react';
import { DetailedUserProfile } from '../../data/mockProfile';
import { Camera, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { generateImageURL } from '@/src/utils/imageUtils';

interface ProfileHeaderProps {
  user: DetailedUserProfile;
  isEditing?: boolean;
  onEditToggle?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isEditing, onEditToggle }) => {
  const { updateProfile } = useAuth();
  const { addNotification } = useNotifications();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      addNotification("Please select a valid image (JPG, PNG, or WEBP)", "error");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      addNotification("Image size must be less than 5MB", "error");
      return;
    }

    // 2. Process Image
    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      const result = await updateProfile({ profileImage: base64String });
      
      if (result.success) {
        addNotification("Profile picture updated successfully", "success");
      } else {
        addNotification(result.message || "Failed to update profile picture", "error");
      }
      
      setIsUploading(false);
      // Clear the file input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.onerror = () => {
      addNotification("Failed to read image file", "error");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 animate-fade-in-up relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/10 to-accent/10"></div>
      
      <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-6 pt-4">
        {/* Avatar */}
        <div className="relative group">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white flex items-center justify-center">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            ) : (
              <img 
                src={user.profileImage ? generateImageURL(user.profileImage, user.id) : user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name?.split(' ')[0] || 'User'}`} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <button 
            onClick={handleFileClick}
            disabled={isUploading}
            className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md text-text-muted hover:text-primary transition-colors border border-gray-100 disabled:opacity-50"
            title="Change Profile Picture"
          >
            <Camera size={18} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left mb-2">
          <h1 className="text-3xl font-bold text-text-main mb-1">{user.name}</h1>
          <p className="text-text-muted mb-3 flex items-center justify-center sm:justify-start gap-2">
            @{user.username || user.email.split('@')[0]} • Member since {user.joinedDate || 'Unknown'}
          </p>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <div className={`
              px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border
              ${user.plan === 'Premium' ? 'bg-indigo-50 text-primary border-indigo-100' : 
                user.plan === 'Pro' ? 'bg-purple-50 text-purple-600 border-purple-100' : 
                'bg-gray-50 text-gray-600 border-gray-200'}
            `}>
              {user.plan} Plan
            </div>
            
            {user.accountStatus === 'Active' && (
              <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-green-50 text-green-600 border border-green-100 flex items-center gap-1">
                <ShieldCheck size={12} /> Verified
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0">
          <Button 
            variant={isEditing ? "secondary" : "outline"} 
            size="sm" 
            onClick={onEditToggle}
          >
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
};
